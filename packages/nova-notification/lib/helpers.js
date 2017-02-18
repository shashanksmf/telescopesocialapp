import Telescope from 'meteor/nova:lib';
import Posts from "meteor/nova:posts";
import Notifications from "./collection.js";

Notifications.helpers({getCollection: () => Notifications});
Notifications.helpers({getCollectionName: () => "Notifications"});

/**
 * @summary Get all of a country's parents
 * @param {Object} country
 */
Notifications.getParents = function (country) {
  const NotificationsArray = [];

  const getParents = function recurse (country) {
    const parent = Notifications.findOne(country.parentId);
    if (parent) {
      NotificationsArray.push(parent);
      recurse(parent);
    }
  }(country);

  return NotificationsArray;
};
Notifications.helpers({getParents: function () {return Notifications.getParents(this);}});
