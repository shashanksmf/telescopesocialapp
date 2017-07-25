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
			try{

		//	document.getElementsByClassName("CustomNotificationListContainer")[0].children[1].className = document.getElementsByClassName("CustomNotificationListContainer")[0].children[1].className
      			( /(?:^|\s)active(?!\S)/g , '' );
		
      			}

      			catch(ex){
      				console.log(ex);
      			}
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
    //var notifn = Notifications.find({to:Meteor.user()._id ,read :false });
    // notification.fetchUnread
    var isItemFound = false;
    var notifn;
    console.log("Meteor.user()._id",Meteor.user()._id)
    Meteor.call('notification.fetchunread',Meteor.user()._id,function(error,result) { 
    	if(error) {
    		console.log("notification.fetchUnread error",error)
    	}
    	console.log("notification.fetchUnread result ",result)
    	notifn = result;
 
    })
  //  var mySet = Array.from(new Set(notifn));

 //    uniqueNotificationArr = notifn.map(item => item._id)
 // 	 .filter(function(value, index, self) { console.log(self); 
	// return self.indexOf(value) === index})	
	if(notifn) {
    return (
      <div className="CustomNotificationListContainer custom" >
		    <div onClick={()=>  {
		    	this.setState({ showList:!this.state.showList })	


		    } }><a className="badgeContainer"> <i className="fa fa-email"><span className="badge">{notifn.length}</span></i></a>
		    </div>

		 	{this.state.showList ? <ul className={this.state.showList ? "list-group active" : " list-group " } >   

		    {notifn.map(function(item,itemIndex){
		    	if(itemIndex <5){
		    	return  <li className="list-group-item" 
onClick={()=>{ 
		    		console.log("calling Notifications markRead");
		    		Meteor.call('notification.markRead',item._id,function(error,result) {
		    			if(error) {
		    				console.log("error",error);
		    				return error
		    			}
		    			console.log("result",result);
	    			})}
		    	} 
		    	>New <Link 


		    	to={{pathname: 'PostDetails', state: { post:Posts.find().fetch({postId:item.postId})[0] }} } className="badge" >{item.message}</Link></li>
		    	}
		    })}
			 
			</ul>
		 : null }
	  </div>
	  	) 	  
	} 
	else return null;
  }
}

module.exports = withRouter(CustomNotificationList);
//()=>{ Notifications.update({_id:item._id},{$set:{read:true}})  }

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