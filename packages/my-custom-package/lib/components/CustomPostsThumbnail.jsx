import React from 'react';
import Posts from "meteor/nova:posts";

const CustomPostsThumbnail = ({post}) => {
	if(post.hasOwnProperty("thumbnailUrl")){
		return (
				<a className="posts-thumbnail" href={Posts.getLink(post)} target={Posts.getLinkTarget(post)}>
				  <span><img src={Posts.getThumbnailUrl(post)} /></span>
				</a>
			  )			
	}
	else if(post.hasOwnProperty("image")){
		if(post.image.length >0){
			return (
				<a className="posts-thumbnail" href={Posts.getLink(post)} target={Posts.getLinkTarget(post)}>
				  <span><img src={post.image[0].url} /></span>
				</a>
			  )	
			
		}
		else{
			return null;
		}
	}
  
}

CustomPostsThumbnail.displayName = "CustomPostsThumbnail";

module.exports = CustomPostsThumbnail;
export default CustomPostsThumbnail;