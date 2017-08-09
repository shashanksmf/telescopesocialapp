import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { ListContainer, DocumentContainer } from "meteor/utilities:react-list-container";
import Posts from "meteor/nova:posts";
import { Tabs, Tab } from 'react-bootstrap';
import { withRouter } from 'react-router';


class MobileSearchPage extends Component {
	
  
  
  
  render() {
   // console.log(this.props);
    //console.log("post home called",this.props,Posts.find().fetch(),Posts.getJoins())
    return (
      <div className="searchPageWrapper">
      <Telescope.components.MobileSearchComponent />
        <Tabs defaultActiveKey={1} id="postPageTabs">
          <Tab eventKey={1} title="Posts">
              <Telescope.components.PostsHome {...this.props}></Telescope.components.PostsHome>
          </Tab>
          <Tab eventKey={2} title="Collection"> <Telescope.components.MobileCategoriesMenu/></Tab>
          <Tab eventKey={3} title="Users">Users</Tab>
        </Tabs>
      </div>
    )
  }
};

module.exports = withRouter(MobileSearchPage);
/*
collection search logic
*/