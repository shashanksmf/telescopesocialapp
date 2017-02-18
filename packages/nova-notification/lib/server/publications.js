import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import Notifications from "../collection.js";

Meteor.publish('notifications', function() {
  
  const currentUser = this.userId && Users.findOne(this.userId);

  if(Users.canDo(currentUser, "posts.view.approved.all")){
    
    var notifications = Notifications.find({to:currentUser}, {fields: Notifications.publishedFields.list});
    var publication = this;

    return notifications;
  }
  return [];
});