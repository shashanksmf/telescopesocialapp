import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { ListContainer, DocumentContainer } from "meteor/utilities:react-list-container";
import Posts from "meteor/nova:posts";

class MobileHome extends Component {
	
  
  getDefaultView() {
    return {view: 'top'}
  }
  
  render() {
   // console.log("renering from mobile Home",Telescope.components.MobilePostsList);
    //console.log("post home called",this.props,Posts.find().fetch(),Posts.getJoins())
    const params = {...this.getDefaultView(), ...this.props.location.query, listId: "posts.list.main",userId: Meteor.userId()};
    const {selector, options} = Posts.parameters.get(params);
  //  console.log("Posts.parameters.get(params) ",{selector},{options})
    return (
      <ListContainer 
        collection={Posts} 
        selector={selector}
        options={options}
        terms={params} 
        joins={Posts.getJoins()}
        component={Telescope.components.MobilePostsList}
        cacheSubscription={true}
        componentProps={{showHeader: false,userCountry:this.props.location.query.country}}
         
        listId={params.listId}
        limit={Telescope.settings.get("postsPerPage", 10)}
      />
    )
  }
};

module.exports = MobileHome;