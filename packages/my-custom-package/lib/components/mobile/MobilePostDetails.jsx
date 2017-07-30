
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

class MobilePostDetails extends Component {
	render () {
	    const post = this.props.location.state.post;
	    const htmlBody = {__html: post.htmlBody};
	    console.log(this.props)

//console.log("custom page ",post,currentUser);
    return (
      
      <div className="posts-pages">
         <div className="mobile-post-page">
            <Telescope.components.HeadTags url={Posts.getLink(post)} title={post.title} image={post.thumbnailUrl} />
            <div className="customPostPageContainer mobile-view">
              {/* <Telescope.components.PostsItem post={post}/> */}
              <div className="posts-item row">
                {(post.thumbnailUrl || post.image) ?
                  <div className="post-mobile-image">
                  
                    { (post.image && post.image.length > 0) ? <img src={post.image[0].url} className="post-image"/> : <img src={Posts.getThumbnailUrl(post)} className="post-image" /> }
                  </div>
                : null}
                <div className="post-header">
                  <Link className="btn-back" to={'/'}><i className="fa fa-chevron-left"></i></Link>
                  <SocialShare post={post} />
                </div>
              </div>

              <Tabs defaultActiveKey={1} id="postPageTabs">
                <Tab eventKey={1} title="Summary">
                    <h3 className="post-title text-center">{post.title}</h3>
                    {post.product ? <HunterMaker  post={post}/> : null}
                  {/*  
                    check if user country matches with the  post country
                      <Telescope.components.MobileDateLikeBtn  post={post} date={moment(itemPriceCountry.relDate).format('MM')+'/'+moment(itemPriceCountry.relDate).format('DD')+'/'+moment(itemPriceCountry.relDate).format('gg')} />
                    */}
                    <img src="share.png" />
                    
                    {post.htmlBody ? <div className="posts-page-body" dangerouslySetInnerHTML={htmlBody}></div> : null}
                  {/* add show timings */}

                  {/*<SocialShare url={ Posts.getLink(post) } title={ post.title }/>*/}
                </Tab>
                <Tab eventKey={2} title="Comments"><Telescope.components.PostsCommentsThread document={post} /></Tab>
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
