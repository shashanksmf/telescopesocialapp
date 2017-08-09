import Telescope from 'meteor/nova:lib';
import React from 'react';
//import MobilePostsItem from './mobile/MobilePostsItem.jsx';
//import { ListContainer } from "meteor/utilities:react-list-container";
//import CustomPostsCategories from './CustomPostsCategories.jsx';
//console.log("CustomPostsCategories",CustomPostsCategories)

const CustomPostList = ({results, currentUser, hasMore, ready, count, totalCount, loadMore, showHeader = true,userCountry,location}) => {
	
	//console.log("custom post list",results)
	var isPhone;
	if (Meteor && Meteor.Device) {
	  isPhone = Meteor.Device.isPhone();
	}

	var isUserSearching;
	//console.log(location)
	var queryUrl = location ? location.query : null;
	if(queryUrl)
	{
		isUserSearching = (queryUrl && queryUrl.query && queryUrl.query.length > 0) ? true : false;
	}      

	var categoriesArr=[];
	results.forEach(function(post){
		if(post.categoriesArray !==undefined){
			post.categoriesArray.forEach(function(category){
				categoriesArr.push(category);
			})
		}
	})
	var filterCategoriesArr=[];
	categoriesArr = categoriesArr.forEach(function(items,index){
	//	console.log(items.name)
		if(filterCategoriesArr.length <1){
			filterCategoriesArr.push(items)
		}
		else{
			var isFound=false;
			filterCategoriesArr.forEach(function(filterItems){
				if(filterItems.name == items.name){
					isFound = true;
				}
			})
			if(isFound==false){
				filterCategoriesArr.push(items)
			}
		}
	})
	//console.log("categoriesArr",filterCategoriesArr)
	
//console.log("custom post list",props)
  if (!!results.length && isPhone) {
    return (
	<div className="CustomPostListWrapper mobileContainer">
	<Telescope.components.PostsListHeader />
      <div className="posts-list">
        <div className="posts-list-content">
          {results.map(post => <Telescope.components.MobilePostsItem userCountry={userCountry} post={post} key={post._id}/>)}
        </div>
        {hasMore && !isUserSearching ? (ready ? <Telescope.components.PostsLoadMore loadMore={loadMore} count={count} totalCount={totalCount} /> : <Telescope.components.PostsLoading/>) : <Telescope.components.PostsNoMore/>}
		
		  
      </div>
	 
	</div>
	  )
  } 
 else if(!!results.length){
 	  return (
	<div className="CustomPostListWrapper">
	<Telescope.components.PostsListHeader /> 
      <div className="posts-list">
        <div className="posts-list-content">
          {results.map(post => <Telescope.components.PostsItem userCountry={userCountry} post={post} key={post._id}/>)}
        </div>
        {hasMore ? (ready ? <Telescope.components.PostsLoadMore loadMore={loadMore} count={count} totalCount={totalCount} /> : <Telescope.components.PostsLoading/>) : <Telescope.components.PostsNoMore/>}
				  
      </div>
	 
	</div>
	  )
 }
  else if (!ready) {
    return (
      <div className="posts-list">
        {showHeader ? <Telescope.components.PostsListHeader /> : null}
        <div className="posts-list-content">
          <Telescope.components.PostsLoading/>
        </div>
      </div>
    )
  } else {
    return (
	<div className="CustomPostListWrapper">
      <div className="posts-list">
        {showHeader ? <Telescope.components.PostsListHeader /> : null}
        <div className="posts-list-content">
          <Telescope.components.PostsNoResults/>
        </div>
      </div>
	  
	  
	</div>  
    )  
  }
  
};

//PostsList.displayName = "PostsList";

export default CustomPostList;
	/* <CustomPostsCategories post={filterCategoriesArr}/> 
 <ListContainer 
            collection={Categories} 
            limit={0} 
            resultsPropName="categories" 
            component={Telescope.components.CustomPostsCategories}
            listId="categories"
          />
            {showHeader ? <Telescope.components.PostsListHeader /> : null}
	*/