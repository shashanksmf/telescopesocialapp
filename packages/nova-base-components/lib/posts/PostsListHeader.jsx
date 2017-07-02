import Telescope from 'meteor/nova:lib';
import React from 'react';
import { ListContainer } from "meteor/utilities:react-list-container";
import Categories from "meteor/nova:categories";
import Countries from "meteor/nova:countries";

const PostsListHeader = () => {
  if (Meteor && Meteor.Device) {
    var isPhone = Meteor.Device.isPhone();
   // console.log("is device");
  }else {

  }

  return (
    <div className="postListHeaderWrapper">
      {isPhone ?
        <div className="mt-row mobile-top-menu clearfix">
          <ul className="mobile-nav">
            <li className="active pointer"><span>New</span></li>
            <li className=""><span>By Date</span></li>
            <li className=""><span>Popular</span></li>
            <li className=""><span>Random</span></li>
          </ul>
        </div>
        : <div className="posts-list-header">
        <div className="posts-list-header-country">
            <ListContainer
              collection={Countries}
              limit={0}
              resultsPropName="countries"
              component={Telescope.components.CountriesList}
              listId="countries"
            />
          </div>
          <div className="posts-list-header-categories">
            <ListContainer
              collection={Categories}
              limit={0}
              resultsPropName="categories"
              component={Telescope.components.CategoriesList}
              listId="categories"
            />
          </div>
          <Telescope.components.PostsViews />
          <Telescope.components.SearchForm/>
        </div>
      }
    </div>
  )
}

PostsListHeader.displayName = "PostsListHeader";


module.exports = PostsListHeader;
export default PostsListHeader;
