import Telescope from 'meteor/nova:lib';
import Posts from "meteor/nova:posts";
import Notifications from "./collection.js";

// generate slug on insert
Notifications.before.insert(function (userId, doc) {
  // if no slug has been provided, generate one
  var slug = !!doc.slug ? doc.slug : Telescope.utils.slugify(doc.name);
  doc.slug = Telescope.utils.getUnusedSlug(Notifications, slug);
});

// generate slug on edit, if it has changed
Notifications.before.update(function (userId, doc, fieldNames, modifier) {
  if (modifier.$set && modifier.$set.slug && modifier.$set.slug !== doc.slug) {
    modifier.$set.slug = Telescope.utils.getUnusedSlug(Notifications, modifier.$set.slug);
  }
});

// add callback that adds notifications CSS classes
function addNotificationClass (postClass, post) {
  var classArray = _.map(Posts.getNotifications(post), function (notification){return "notification-"+notification.slug;});
  return postClass + " " + classArray.join(' ');
}
Telescope.callbacks.add("postClass", addNotificationClass);

// ------- Notifications Check -------- //

// make sure all notifications in the post.notifications array exist in the db
var checkNotifications = function (post) {

  // if there are no notifications, stop here
  if (!post.notifications || post.notifications.length === 0) {
    return;
  }

  // check how many of the notifications given also exist in the db
  var notificationCount = Notifications.find({_id: {$in: post.notifications}}).count();

  if (post.notifications.length !== notificationCount) {
    throw new Meteor.Error('invalid_notification', 'invalid_notification');
  }
};

function postsNewCheckNotifications (post) {
  checkNotifications(post);
  return post;
}
Telescope.callbacks.add("posts.new.sync", postsNewCheckNotifications);

function postEditCheckNotifications (post) {
  checkNotifications(post);
  return post;
}
Telescope.callbacks.add("posts.edit.sync", postEditCheckNotifications);

// TODO: debug this

// function addParentNotificationsOnSubmit (post) {
//   var notifications = post.notifications;
//   var newNotifications = [];
//   if (notifications) {
//     notifications.forEach(function (notificationId) {
//       var notification = Notifications.findOne(notificationId);
//       newNotifications = newNotifications.concat(_.pluck(notification.getParents().reverse(), "_id"));
//       newNotifications.push(notification._id);
//     });
//   }
//   post.notifications = _.unique(newNotifications);
//   return post;
// }
// Telescope.callbacks.add("posts.new.sync", addParentNotificationsOnSubmit);

// function addParentNotificationsOnEdit (modifier, post) {
//   if (modifier.$unset && modifier.$unset.notifications !== undefined) {
//     return modifier;
//   }

//   var notifications = modifier.$set.notifications;
//   var newNotifications = [];
//   if (notifications) {
//     notifications.forEach(function (notificationId) {
//       var notification = Notifications.findOne(notificationId);
//       newNotifications = newNotifications.concat(_.pluck(notification.getParents().reverse(), "_id"));
//       newNotifications.push(notification._id);
//     });
//   }
//   modifier.$set.notifications = _.unique(newNotifications);
//   return modifier;
// }
// Telescope.callbacks.add("posts.edit.sync", addParentNotificationsOnEdit);
