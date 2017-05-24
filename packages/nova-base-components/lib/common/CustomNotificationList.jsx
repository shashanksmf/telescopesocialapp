import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
import classNames from "classnames";
//import { Messages, ModalTrigger } from 'meteor/nova:core';
import { withRouter } from 'react-router'
import Users from 'meteor/nova:users';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import Notifications from "meteor/nova:notification";

class CustomNotificationList extends Component {
	constructor(props){
		super(props);	
		this.state = {showList : false}	
		
	}

	componentDidMount() {
		document.addEventListener('click', function(){
			document.getElementsByClassName("CustomNotificationListContainer")[0].children[1].className = document.getElementsByClassName("CustomNotificationListContainer")[0].children[1].className
      			( /(?:^|\s)active(?!\S)/g , '' );
		});
	}
	   
  	render() {
    
    const {category, index, router} = this.props;
	
    const currentQuery = router.location.query;
    const currentCategorySlug = router.location.query.cat;
    const newQuery = _.clone(router.location.query);
	
	//sconsole.log(currentQuery,currentCategorySlug,newQuery)
   // newQuery.cat = category.slug; 
   //console.log("Notification",Notification.find().fetch());
    var uniqueNotificationArr = [];
    var notifn = Notifications.find().fetch();
    var isItemFound = false;
    
    var mySet = Array.from(new Set(notifn));

 //    uniqueNotificationArr = notifn.map(item => item._id)
 // 	 .filter(function(value, index, self) { console.log(self); 
	// return self.indexOf(value) === index})	


	//	console.log("Notification : ",uniqueNotificationArr);
 	
    return (
      <div className="CustomNotificationListContainer" >
		    <div onClick={()=>  {
		    	this.setState({ showList:!this.state.showList })	


		    } }><a href="#"> <span className="badge">Notifications 5</span></a></div>

		    <ul className={this.state.showList ? "list-group active" : " list-group " } >

		    {notifn.map(function(item,itemIndex){
		    	if(itemIndex <5){
		    	return  <li key={"Notification_"+itemIndex} className="list-group-item">New <span className="badge">{item.message}</span></li>
		    	}
		    })}
			 
			</ul>
	  </div>
	  	)
		  
	
  }
}

module.exports = withRouter(CustomNotificationList);
// export default withRouter(CustomNotificationList);  

//         for(var j=0;j<notifn.length;j++) {
// 	    	for(var i=0;i<uniqueNotificationArr.length;i++) {
//  				if(uniqueNotificationArr[i]._id != notifn[j]._id){
//  					isItemFound = true;
//  					uniqueNotificationArr.push(notifn[j]) ;
//  				}
// 	    	}
// 	    	if(!isItemFound) {
// 	    		isItemFound = false;
// 	    		uniqueNotificationArr.push(notifn[j]) ;
// 	    	}
	   	
// 		}