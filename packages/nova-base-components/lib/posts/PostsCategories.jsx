import React from 'react';
import { Link } from 'react-router';

const PostsCategories = ({post}) => {
  return (
    <div className="posts-categories">
      {post.categoriesArray.map(category => 
      	
        <Link className="posts-category" key={category._id} to={{pathname: "/", query: {cat: category.slug}, state :category.name}}>{category.name}</Link>
      )}
    </div>
  )
};

PostsCategories.displayName = "PostsCategories";

module.exports = PostsCategories;