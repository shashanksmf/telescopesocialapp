import Telescope from 'meteor/nova:lib';
import Posts from "meteor/nova:posts";
import notification from "./collection.js";

notification.helpers({getCollection: () => notification});
notification.helpers({getCollectionName: () => "notification"});

/**
 * @summary Get all of a country's parents
 * @param {Object} country
 */
notification.getParents = function (country) {
  const NotificationsArray = [];

  const getParents = function recurse (country) {
    const parent = notification.findOne(country.parentId);
    if (parent) {
      NotificationsArray.push(parent);
      recurse(parent);
    }
  }(country);

  return NotificationsArray;
};
notification.helpers({getParents: function () {return notification.getParents(this);}});
