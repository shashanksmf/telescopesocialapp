import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import Notification from "../collection.js";

Meteor.publish('notifications', function() {
  
  const currentUser = this.userId && Users.findOne(this.userId);

  if(Users.canDo(currentUser, "posts.view.approved.all")){
    
    var notifications = Notification.find({}, {fields: Notification.publishedFields.list});
    var publication = this;

    notifications.forEach(function (country) {
      var childrenCountries = country.getChildren();
      var countryIds = [country._id].concat(_.pluck(childrenCountries, "_id"));
      var cursor = Posts.find({$and: [{notifications: {$in: countryIds}}, {status: Posts.config.STATUS_APPROVED}]});
    });

    return notifications;
  }
  return [];
});