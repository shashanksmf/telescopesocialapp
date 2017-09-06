import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import Users from 'meteor/nova:users';
import Notification from 'meteor/nova:notification';


class MobileVariousDatesBtn extends Component { 
	
	constructor(props) {
	    super(props);

	    this.upvote = this.upvote.bind(this);
      this.state = { post : props.post , showDateVenueList : false }
    }

	upvote(e) {
    if(e) {
    e.preventDefault();
  }
    const post = this.state.post;
    const user = this.context.currentUser;

    if(!user){
      this.context.messages.flash("Please log in first");
    }  else {
      this.context.actions.call('posts.upvote', post._id, () => {
          this.context.events.track("post upvoted", {'_id': post._id});
      });

      // 1st check if already the posts exists in database
      var nowDate = new Date();
      nowDate.setDate(nowDate.getDate());
       var dataDate = new Date(post.productReleaseDate[0].reldate);
        var dayDiff = dateDiffInDays(nowDate,dataDate);
        if(dayDiff < 3 ){
        if(post.productReleaseDate && post.productReleaseDate[0].reldate) {

            var checkIfPostExist = Notification.find({to:user._id,postId:post._id}).fetch();
            if(checkIfPostExist.length == 0) {
              // insert into the database
             var insertObj = {
                to: user._id,
                postId: post._id,
                read: false,
                message: post.title + ' Will Relase on' + post.productReleaseDate[0].reldate.toDateString(),
                date: new Date()   
              };

              Meteor.call("notification.insert",insertObj,function(error,result){
                if(error){
                  console.log("errro in insert nottification");
                }
                console.log("result",result);
              })
           // Notification.insert(insertObj,function(error){
             //   console.log(error)
              //})
            
            
            }

            else{
              // remove the existing notification by id
            }

            

        }

      }


    }

     function dateDiffInDays(a, b) {
      var _MS_PER_DAY = 1000 * 60 * 60 * 24;
      // Discard the time and time-zone information.
      var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

      return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }
 
      var that = this;
       Meteor.call('getPostById', that.props.post._id, function(err,result) {
        console.log(err,result)
        if(!err) {
          that.setState({post : result[0]})
       //   return post = result[0];
        }
     //   return null
        
      })
  
	}


  showDateVenuePopUp (){
    this.setState({showDateVenueList : true});

  }

  selectDateFromList(item){
    //console.log("item event",item,event)
    const post = this.state.post;
    const user = this.context.currentUser;
    const hasUpvoted = Users.hasUpvoted(user, post);

    if(!hasUpvoted) {
      this.upvote();
    }

    //console.log("item catched",item);
    Meteor.call('users.insertPostIdAndReleaseDateId', Meteor.userId(),this.state.post._id , item._id ,function (err,result) {
      console.log("err result",err,result);
      if(result) {

      }
    })
    //this.upvote();



    /*
    1. first check if user has upvoted the post
      if not then upvote

    2. Store the productReleaseDate id into the user upvoted array

    3. If product ReleaseDate id is present in user upvotedArray then store date  
    */
  }

  closeVenueDatePopUp(){

     this.setState({showDateVenueList : false});    
  }


   

	render() { 
      //console.log("posts fetch ",)
	    const post = this.state.post;
	    const user = this.context.currentUser;
      console.log("showDateVenueList",this.state.showDateVenueList)
      const hasUpvoted = Users.hasUpvoted(user, post);
	    const hasDownvoted = Users.hasDownvoted(user, post);
	    const actionsClass = classNames(
	      "vote", 
	      {voted: hasUpvoted || hasDownvoted},
	      {upvoted: hasUpvoted},
	      {downvoted: hasDownvoted}
	    );
     // console.log("hasUpvoted",hasUpvoted)
      var countryMatchArr = this.props.dateCountryMatch;
	    var userProReleaseDate =  Users.find({_id : Meteor.userId() ,"telescope.productReleaseDate.postId": this.state.post._id }).fetch();
      //console.log("isRecordFound",userProReleaseDate);
      userProReleaseDate = userProReleaseDate[0];
      var isRelDateFound;
      if(userProReleaseDate.telescope.hasOwnProperty("productReleaseDate") && userProReleaseDate.telescope.productReleaseDate.length > 0) {
        userProReleaseDate.telescope.productReleaseDate.forEach(function(userDates) {
          countryMatchArr.forEach(function(relDates){
            if(relDates._id == userDates.releaseDateId) {
              isRelDateFound = relDates;
            }
          })
        })
      }

      //console.log("isRelDateFound",isRelDateFound)



      if(hasUpvoted && isRelDateFound) {
        return(<div className="mobileVariosuDatesBtn upvote">
          <a onClick={this.showDateVenuePopUp.bind(this)}>
            <i className="icon  fa fa-check"></i>
            <span>{isRelDateFound.reldate_local}</span>
          </a>
           {this.state.showDateVenueList ? <Telescope.components.MobileDateVenueList 
                                            updateSelectedDate={this.selectDateFromList.bind(this)} 
                                            closePopUp={this.closeVenueDatePopUp.bind(this)}
                                            countryDate={this.props.dateCountryMatch} /> 
            : null }
        
          </div>)
      }
      else {
        return (

          <div className="mobileVariosuDatesBtn downVote" >
            <a onClick={this.showDateVenuePopUp.bind(this)}>
              <i className="icon  fa fa-plus" aria-hidden="true"></i>
              <span className="date">Various Dates</span>
            </a>

            {this.state.showDateVenueList ? <Telescope.components.MobileDateVenueList 
                                              updateSelectedDate={this.selectDateFromList.bind(this)} 
                                              closePopUp={this.closeVenueDatePopUp.bind(this)} 
                                              countryDate={this.props.dateCountryMatch} /> 
            : null }
              
            
          </div>
        
          )
      }
	
	}

}

MobileVariousDatesBtn.propTypes = {
  post: React.PropTypes.object.isRequired, // the current post
};

MobileVariousDatesBtn.contextTypes = {
  currentUser: React.PropTypes.object,
  actions: React.PropTypes.object,
  events: React.PropTypes.object,
  messages: React.PropTypes.object
};

module.exports = MobileVariousDatesBtn;
export default MobileVariousDatesBtn;