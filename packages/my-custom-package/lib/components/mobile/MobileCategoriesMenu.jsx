import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class MobileCategoriesMenu extends Component { 
	
	constructor() {
	    super();
  }
	

	render() { 

  const categoriesArr=[];  
  Categories.find().fetch().forEach(function(items){
    categoriesArr.push(items);
  })

	  return(
         <div className="categoriesMenuWrapper">
          <style dangerouslySetInnerHTML={{__html: `
            .main{
              padding:0;
            } 
            body {
              background-color:#F2F6F9 !important;
            }
            `}}/>
            {categoriesArr.map(function(category){
             return <Link className="categoryBlock" key={category._id} to={{pathname: "/", query: {cat: category.slug} , state :category.name }}><span>{category.name}</span></Link>         
            })}           
        </div>
      )
  }
}
module.exports = MobileCategoriesMenu;
export default MobileCategoriesMenu;
//return (<div className="categoryBlock"><span>{category.name}</span></div>);