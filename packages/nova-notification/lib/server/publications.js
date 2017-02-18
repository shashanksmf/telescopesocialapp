import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import Notifications from "../collection.js";

Meteor.publish('notifications', function() {
  
  const currentUser = this.userId && Users.findOne(this.userId);

  if(Users.canDo(currentUser, "posts.view.approved.all")){
    //console.log(currentUser._id);
    var notifications = Notifications.find({to:currentUser._id}, {fields: Notifications.publishedFields.list});
    var publication = this;
    //console.log(notifications.fetch());
    return notifications;
  }
  return [];
});