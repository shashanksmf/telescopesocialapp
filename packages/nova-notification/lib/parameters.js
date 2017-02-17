import Telescope from 'meteor/nova:lib';
import Notification from "./collection.js";

// notification Posts Parameters
// Add a "notifications" property to terms which can be used to filter *all* existing Posts views. 
function addnotificationParameter (parameters, terms) {

  var notification = terms.notification || terms["notification[]"];

  // filter by notification if notification slugs are provided
  if(notification){
    // do nothing
  //} else if (notification) {

    var notificationsIds = [];
    var selector = {};

    if (typeof notification === "string") { // notification is a string
      selector = {slug: notification};
    } else if (Array.isArray(notification)) { // notification is an array
      selector = {slug: {$in: notification}};
    }

    // get all notifications passed in terms
    var notifications = Notification.find(selector).fetch();
    
    // for each notification, add its ID and the IDs of its children to notificationsId array
    notifications.forEach(function (notification) {
      notificationsIds.push(notification._id);
      notificationsIds = notificationsIds.concat(_.pluck(Notification.getChildren(notification), "_id"));
    });

    //parameters.selector.notifications = {$in: notificationsIds};
  //  parameters.selector.customArray11 = {'$elemMatch':{ 'notification' : notification }};
//  } else {
    //parameters.selector.customArray11 = {'$elemMatch':{ 'notification' : 'uk' }};
  }
  return parameters;
}
Telescope.callbacks.add("posts.parameters", addnotificationParameter);