
import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { IndexLink } from 'react-router';
import { FormattedMessage, intlShape } from 'react-intl';
import HunterMaker from './../partials/HunterMaker.jsx';
import CustomPostDetails from './../partials/CustomPostDetails.jsx';
import { Tabs, Tab } from 'react-bootstrap';
//console.log(HunterMaker)
import Posts from "meteor/nova:posts";
import { Link } from 'react-router';
import { withRouter } from 'react-router';
import SocialShare from './../partials/SocialShare.jsx';
import moment from 'moment';

class MobilePostDetails extends Component {
  constructor(props){
    super(props);
    this.state = {  post: null ,htmlBody:null };
  }

  componentWillMount(){
    var postsId = this.props.router.params.id;
    var that = this;
    var post,htmlBody;
      Meteor.call('getPostById',postsId, function(err,result) {
        //console.log(err,result)
        if(!err) {
          that.setState({post : result[0] , htmlBody :  result[0].htmlBody || null });
        }
        
      })
  }

	render () {
      var userTelObj = Meteor.user().telescope;
      var userCountry = (userTelObj.hasOwnProperty("location") && userTelObj.location.length > 0 && userTelObj.location[0].hasOwnProperty("country")) ? userTelObj.location[0].country : Meteor.settings.public.defaultCountry;
      
     // return;
     // var postArr = 
     // console.log(this.props.router.params.id)
      
      //console.log("posts",)

//console.log("custom page ",this.state.post);
    if(!this.state.post) {
      return null;
    }
    return (
      
      <div className="posts-pages">
         <div className="mobile-post-page">
            <Telescope.components.HeadTags url={Posts.getLink(this.state.post)} title={this.state.post.title} image={this.state.post.thumbnailUrl} />
            <div className="customPostPageContainer mobile-view">
              {/* <Telescope.components.PostsItem post={post}/> */}
              <div className="posts-item row">
                {(this.state.post.thumbnailUrl || this.state.post.image) ?
                  <div className="post-mobile-image">
                  
                    { (this.state.post.image && this.state.post.image.length > 0) ? <img src={this.state.post.image[0].url} className="post-image"/> : <img src={Posts.getThumbnailUrl(this.state.post)} className="post-image" /> }
                  </div>
                : null}
                <div className="post-header">
                  <Link className="btn-back" to={'/'}><i className="fa fa-chevron-left"></i></Link>
                  <SocialShare post={this.state.post} />
                </div>
              </div>

              <Tabs defaultActiveKey={1} id="postPageTabs">
                <Tab eventKey={1} title="Summary">
                    <h3 className="post-title text-center">{this.state.post.title}</h3>
                    {this.state.post.product ? <HunterMaker  post={this.state.post}/> : null}
                  {/*  
                    check if user country matches with the  post country
                      <Telescope.components.MobileDateLikeBtn  post={post} date={moment(itemPriceCountry.relDate).format('MM')+'/'+moment(itemPriceCountry.relDate).format('DD')+'/'+moment(itemPriceCountry.relDate).format('gg')} />
                    */}

                  {/* code for venue */}

                  {(this.state.post.hasOwnProperty("customArray11") && this.state.post.customArray11.length > 0) ? 
                    this.state.post.customArray11.map(function(item,index){
                      console.log("item",item,index,userCountry)
                      if((item.hasOwnProperty("country")) && (item.country == userCountry)) {
                        return <div className="venue text-center"><i className="fa fa-map-marker"></i><span>{userCountry}</span></div>
                      }
                    })

                  : null }

                  {/* code for venue */}


                    {(this.state.post.hasOwnProperty("Genre") || this.state.post.hasOwnProperty("Action")) ?
                      <div className="MoviesDetails">
                        {this.state.post.hasOwnProperty("Genre") ? 
                          <div className="genre"><label>Genre:</label> {this.state.post.Genre}</div>
                         : null }

                         {this.state.post.hasOwnProperty("Ratings") ? 
                          <div className="ratings"><label>Ratings:</label> {this.state.post.Ratings}</div>
                         : null }

                      </div>

                      : null }

                    {this.state.post.hasOwnProperty("customArray11") && this.state.post.customArray11[0].hasOwnProperty("reldate") ? 
                      <Telescope.components.MobileDateLikeBtn mobilepostdetails={true} post={this.state.post} date={moment(this.state.post.customArray11[0].relDate).format('MM')+'/'+moment(this.state.post.customArray11[0].relDate).format('DD')+'/'+moment(this.state.post.customArray11[0].relDate).format('gg')} />
                    : null }
                    
                    
                    {this.state.post.htmlBody ? <div className="posts-page-body" dangerouslySetInnerHTML={{__html:this.state.htmlBody}} ></div> : null}
                  {/* add show timings */}

                  {/*<SocialShare url={ Posts.getLink(post) } title={ post.title }/>*/}
                </Tab>
                <Tab eventKey={2} title="Comments"><Telescope.components.PostsCommentsThread document={this.state.post} /></Tab>
                <Tab eventKey={3} title="Other"></Tab>
              </Tabs>

            </div>
          </div> 

    </div>
  );
    }
}


module.exports = withRouter(MobilePostDetails);

export default withRouter(MobilePostDetails);
