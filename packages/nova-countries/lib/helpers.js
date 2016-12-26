import Telescope from 'meteor/nova:lib';
import Posts from "meteor/nova:posts";
import Countries from "./collection.js";

Countries.helpers({getCollection: () => Countries});
Countries.helpers({getCollectionName: () => "countries"});

/**
 * @summary Get all of a country's parents
 * @param {Object} country
 */
Countries.getParents = function (country) {
  const countriesArray = [];

  const getParents = function recurse (country) {
    const parent = Countries.findOne(country.parentId);
    if (parent) {
      countriesArray.push(parent);
      recurse(parent);
    }
  }(country);

  return countriesArray;
};
Countries.helpers({getParents: function () {return Countries.getParents(this);}});

/**
 * @summary Get all of a country's children
 * @param {Object} country
 */
Countries.getChildren = function (country) {
  var countriesArray = [];

  var getChildren = function recurse (countries) {
    var children = Countries.find({parentId: {$in: _.pluck(countries, "_id")}}).fetch()
    if (children.length > 0) {
      countriesArray = countriesArray.concat(children);
      recurse(children);
    }
  }([country]);

  return countriesArray;
};
Countries.helpers({getChildren: function () {return Countries.getChildren(this);}});

/**
 * @summary Get all of a post's countries
 * @param {Object} post
 */
Posts.getCountries = function (post) {
  return !!post.countries ? Countries.find({_id: {$in: post.countries}}).fetch() : [];
};
Posts.helpers({getCountries: function () {return Posts.getCountries(this);}});

/**
 * @summary Get a country's URL
 * @param {Object} country
 */
Countries.getUrl = function (country, isAbsolute) {
  isAbsolute = typeof isAbsolute === "undefined" ? false : isAbsolute; // default to false
  const prefix = isAbsolute ? Telescope.utils.getSiteUrl().slice(0,-1) : "";
  // return prefix + FlowRouter.path("postsCountry", country);
  return `${prefix}/?cat=${country.slug}`;
};
Countries.helpers({getUrl: function () {return Countries.getUrl(this);}});

/**
 * @summary Get a country's counter name
 * @param {Object} country
 */
 Countries.getCounterName = function (country) {
  return country._id + "-postsCount";
 }
 Countries.helpers({getCounterName: function () {return Countries.getCounterName(this);}});
