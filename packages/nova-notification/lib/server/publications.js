import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import Notification from "../collection.js";

Meteor.publish('notification', function() {
  
  const currentUser = this.userId && Users.findOne(this.userId);

  if(currentUser && Users.canDo(currentUser, "posts.view.approved.all")){
    //console.log(currentUser._id);
    if(currentUser.hasOwnProperty("_id")) {
    	   var notification = Notification.find({to:currentUser._id}, {fields: Notification.publishedFields.list});
		    var publication = this;
		    //console.log(notifications.fetch());
		    return notification;
    }
   }
  return [];
});