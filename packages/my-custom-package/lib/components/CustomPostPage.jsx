import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { IndexLink } from 'react-router';
import { FormattedMessage, intlShape } from 'react-intl';
import HunterMaker from './partials/HunterMaker.jsx';
import CustomPostDetails from './partials/CustomPostDetails.jsx';
//console.log(HunterMaker)
import Posts from "meteor/nova:posts";
const CustomPostPage = ({document, currentUser}) =>  {
    
    const post = document;
    const htmlBody = {__html: post.htmlBody};
 
	 
//console.log("custom page ",post,currentUser); 
    return (
      <div className="posts-pages">
	
      <Telescope.components.HeadTags url={Posts.getLink(post)} title={post.title} image={post.thumbnailUrl} />
      <div className="customPostPageContainer">
        <Telescope.components.PostsItem post={post}/>
  		  {post.product ? <HunterMaker  post={post}/> : null}	
        <CustomPostDetails/>
        {post.htmlBody ? <div className="posts-page-body" dangerouslySetInnerHTML={htmlBody}></div> : null}
		  </div>
      {/*<SocialShare url={ Posts.getLink(post) } title={ post.title }/>*/}
		 
      <Telescope.components.PostsCommentsThread document={post} />
		
    </div>
	);
  

}

export default CustomPostPage;