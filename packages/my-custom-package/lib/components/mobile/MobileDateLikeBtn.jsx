import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import Users from 'meteor/nova:users';

class MobileDateLikeBtn extends Component { 
	
	constructor() {
	    super();
	    this.upvote = this.upvote.bind(this);
    }

	upvote(e) {
    e.preventDefault();

    const post = this.props.post;
    const user = this.context.currentUser;

    if(!user){
      this.context.messages.flash("Please log in first");
    } else if (user.hasUpvoted(post)) {
      this.context.actions.call('posts.cancelUpvote', post._id, () => {
        this.context.events.track("post upvote cancelled", {'_id': post._id});
      });        
    } else {
      this.context.actions.call('posts.upvote', post._id, () => {
          this.context.events.track("post upvoted", {'_id': post._id});
      });

      // 1st check if already the posts exists in database
      var nowDate = new Date();
      nowDate.setDate(nowDate.getDate());
       var dataDate = new Date(post.customArray11[0].reldate);
        var dayDiff = dateDiffInDays(nowDate,dataDate);
        if(dayDiff < 3 ){
        if(post.customArray11 && post.customArray11[0].reldate) {

            var checkIfPostExist = Notification.find({to:user._id,postId:post._id}).fetch();
            if(checkIfPostExist.length == 0) {
              // insert into the database
             var insertObj = {
                to: user._id,
                postId: post._id,
                read: false,
                message: post.title + ' Will Relase on' + post.customArray11[0].reldate.toDateString(),
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
	}
	  // a and b are javascript Date objects
   

	render() { 

	    const post = this.props.post;
	    const user = this.context.currentUser;

	    const hasUpvoted = Users.hasUpvoted(user, post);
	    const hasDownvoted = Users.hasDownvoted(user, post);
	    const actionsClass = classNames(
	      "vote", 
	      {voted: hasUpvoted || hasDownvoted},
	      {upvoted: hasUpvoted},
	      {downvoted: hasDownvoted}
	    );
	    
		//console.log("mobileDateLikeBtn ",this.props)
		return (

				<div className={hasUpvoted ? "upvote upvote-button mobileDateLikeBtn" : "downVote upvote-button mobileDateLikeBtn"} onClick={this.upvote}>	
					<a>
					 	<i className={hasUpvoted == false ? "icon  fa fa-plus":"icon  fa fa-check" } aria-hidden="true"></i>
				       		
				    	<span className="date">{this.props.date}</span>   
			        </a>
			 	    
				</div>
			)
	}

}

MobileDateLikeBtn.propTypes = {
  post: React.PropTypes.object.isRequired, // the current post
};

MobileDateLikeBtn.contextTypes = {
  currentUser: React.PropTypes.object,
  actions: React.PropTypes.object,
  events: React.PropTypes.object,
  messages: React.PropTypes.object
};

module.exports = MobileDateLikeBtn;
export default MobileDateLikeBtn;