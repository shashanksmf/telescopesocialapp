import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { FlashContainer } from "meteor/nova:core";
import CustomPostsCategories from './CustomPostsCategories.jsx';
class CustomLayout extends Telescope.components.Layout {

  render() {

    return (
      <div className="wrapper" id="wrapper">

        <Telescope.components.HeadTags />

        <Telescope.components.UsersProfileCheck {...this.props} />

        <Telescope.components.Header {...this.props}/>
      
        <div className="main">

          <FlashContainer component={Telescope.components.FlashMessages}/>
			
          <Telescope.components.Newsletter {...this.props}/>
			
		<div className="CustomCategoriesContainer">
			<div className="customCategoriesWrapper">
					<CustomPostsCategories/>
			</div>
        </div>
		{this.props.children}
        </div>
      
        <Telescope.components.Footer {...this.props}/>
      
      </div>
    )

  }
}



export default CustomLayout;
/* 
<div className="customLayoutCategoriesBlock">
				<Telescope.components.Categories  />
			</div>	 */