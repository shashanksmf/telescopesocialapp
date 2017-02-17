import Telescope from 'meteor/nova:lib';
import Posts from "meteor/nova:posts";
import Notification from "./collection.js";

Notification.helpers({getCollection: () => Notification});
Notification.helpers({getCollectionName: () => "Notification"});

/**
 * @summary Get all of a country's parents
 * @param {Object} country
 */
Notification.getParents = function (country) {
  const NotificationArray = [];

  const getParents = function recurse (country) {
    const parent = Notification.findOne(country.parentId);
    if (parent) {
      NotificationArray.push(parent);
      recurse(parent);
    }
  }(country);

  return NotificationArray;
};
Notification.helpers({getParents: function () {return Notification.getParents(this);}});

/**
 * @summary Get all of a country's children
 * @param {Object} country
 */
Notification.getChildren = function (country) {
  var NotificationArray = [];

  var getChildren = function recurse (Notification) {
    var children = Notification.find({parentId: {$in: _.pluck(Notification, "_id")}}).fetch()
    if (children.length > 0) {
      NotificationArray = NotificationArray.concat(children);
      recurse(children);
    }
  }([country]);

  return NotificationArray;
};
Notification.helpers({getChildren: function () {return Notification.getChildren(this);}});

/**
 * @summary Get all of a post's Notification
 * @param {Object} post
 */
Posts.getNotification = function (post) {
  return !!post.Notification ? Notification.find({_id: {$in: post.Notification}}).fetch() : [];
};
Posts.helpers({getNotification: function () {return Posts.getNotification(this);}});

/**
 * @summary Get a country's URL
 * @param {Object} country
 */
Notification.getUrl = function (country, isAbsolute) {
  isAbsolute = typeof isAbsolute === "undefined" ? false : isAbsolute; // default to false
  const prefix = isAbsolute ? Telescope.utils.getSiteUrl().slice(0,-1) : "";
  // return prefix + FlowRouter.path("postsCountry", country);
  return `${prefix}/?cat=${country.slug}`;
};
Notification.helpers({getUrl: function () {return Notification.getUrl(this);}});

/**
 * @summary Get a country's counter name
 * @param {Object} country
 */
 Notification.getCounterName = function (country) {
  return country._id + "-postsCount";
 }
 Notification.helpers({getCounterName: function () {return Notification.getCounterName(this);}});
