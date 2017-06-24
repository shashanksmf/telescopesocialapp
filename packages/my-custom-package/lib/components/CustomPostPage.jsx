import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { IndexLink } from 'react-router';
import { FormattedMessage, intlShape } from 'react-intl';
import HunterMaker from './partials/HunterMaker.jsx';
import CustomPostDetails from './partials/CustomPostDetails.jsx';
import { Tabs, Tab } from 'react-bootstrap';
//console.log(HunterMaker)
import Posts from "meteor/nova:posts";
const CustomPostPage = ({document, currentUser}) =>  {

    const post = document;
    const htmlBody = {__html: post.htmlBody};

    if (Meteor && Meteor.Device) {
      var isPhone = Meteor.Device.isPhone();
    }

    var handleBack = function () {
      window.history.back();
    };

//console.log("custom page ",post,currentUser);
    return (
      <div className="posts-pages">
        {isPhone ? <div className="mobile-post-page">
            <Telescope.components.HeadTags url={Posts.getLink(post)} title={post.title} image={post.thumbnailUrl} />
            <div className="customPostPageContainer mobile-view">
              {/* <Telescope.components.PostsItem post={post}/> */}
              <div className="posts-item row">
                {(post.thumbnailUrl || post.image) ?
                  <div className="post-mobile-image">
                    { post.image ? <img src={post.image[0].url} className="post-image"/> : <img src={Posts.getThumbnailUrl(post)} className="post-image" /> }
                  </div>
                : null}
                <div className="post-header">
                  <span className="btn-back" onClick={() => handleBack(this)}><i className="fa fa-chevron-left"></i></span>
                </div>
              </div>

              <Tabs defaultActiveKey={1} id="postPageTabs">
                <Tab eventKey={1} title="Summary">
                    <h3 className="post-title text-center">{post.title}</h3>
                    {post.product ? <HunterMaker  post={post}/> : null}
                    <CustomPostDetails post={post} />
                    {post.htmlBody ? <div className="posts-page-body" dangerouslySetInnerHTML={htmlBody}></div> : null}
                  {/*<SocialShare url={ Posts.getLink(post) } title={ post.title }/>*/}
                </Tab>
                <Tab eventKey={2} title="Comments"><Telescope.components.PostsCommentsThread document={post} /></Tab>
                <Tab eventKey={3} title="Other"></Tab>
              </Tabs>

            </div>
          </div> :
          <div class="desktop-post-page">
            <Telescope.components.HeadTags url={Posts.getLink(post)} title={post.title} image={post.thumbnailUrl} />
            <div className="customPostPageContainer">
              <Telescope.components.PostsItem post={post}/>
              {post.product ? <HunterMaker  post={post}/> : null}
              <CustomPostDetails post={post} />
              {post.htmlBody ? <div className="posts-page-body" dangerouslySetInnerHTML={htmlBody}></div> : null}
            </div>
            {/*<SocialShare url={ Posts.getLink(post) } title={ post.title }/>*/}
            <Telescope.components.PostsCommentsThread document={post} />
          </div>
        }

    </div>
  );
}

export default CustomPostPage;
