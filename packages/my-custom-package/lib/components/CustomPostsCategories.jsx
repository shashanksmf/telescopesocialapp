import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
import classNames from "classnames";
//import { Messages, ModalTrigger } from 'meteor/nova:core';
import { withRouter } from 'react-router'
import Users from 'meteor/nova:users';
import { LinkContainer } from 'react-router-bootstrap';

class CustomPostsCategories extends Component {
	constructor(props){
		super(props);
	//	console.log("constructor props ",this.props)
		
	}
	componentWillReceiveProps(props){
		//console.log("propscustom",this.props)
	}
  renderEdit() {
    return (
      <Telescope.components.CanDo action="categories.edit.all">
        <a onClick={this.props.openModal} className="edit-category-link"><Telescope.components.Icon name="edit"/></a>
      </Telescope.components.CanDo>
    );
    // return (
    //   <ModalTrigger title="Edit Category" component={<a className="edit-category-link"><Telescope.components.Icon name="edit"/></a>}>
    //     <Telescope.componentsCategoriesEditForm category={this.props.category}/>
    //   </ModalTrigger>
    // )
  }

  render() {
//console.log("this.props; custome categories",this.props)
      const {category, index, router} = this.props;
	
    const currentQuery = router.location.query;
    const currentCategorySlug = router.location.query.cat;
    const newQuery = _.clone(router.location.query);
	
	//sconsole.log(currentQuery,currentCategorySlug,newQuery)
   // newQuery.cat = category.slug;  
	const newArr=[];	
	Categories.find().fetch().forEach(function(items){
		newArr.push(items);
	})
    return (
      <div className="category-menu-item dropdown-item">
	  {newArr.map(function(category){
		   const newQuery = _.clone(router.location.query);
			newQuery.cat = category.slug;
		  
		  return (<div className={currentCategorySlug === category.slug ? "CategoriesLinkWrapper active": "CategoriesLinkWrapper"}>
		        <LinkContainer to={{pathname:"/list", query: newQuery}}>
				   <MenuItem 
					eventKey={index+1} 
					key={category._id} 
				  >
					{currentCategorySlug === category.slug ? <Telescope.components.Icon name="voted"/> :  null}
					{category.name}
				  </MenuItem>
				</LinkContainer>
		  </div>)
		  
	  })}
  
      </div>
    )
  }
}

module.exports = withRouter(CustomPostsCategories);
export default withRouter(CustomPostsCategories);  
/* {post.categoriesArray.map(category => 
        <Link className="posts-category" key={category._id} to={{pathname: "/", query: {cat: category.slug}}}>{category.name}</Link>
      )} */