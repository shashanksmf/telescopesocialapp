import Telescope from 'meteor/nova:lib';
import Posts from "meteor/nova:posts";
import Countries from "./collection.js";

// generate slug on insert
Countries.before.insert(function (userId, doc) {
  // if no slug has been provided, generate one
  var slug = !!doc.slug ? doc.slug : Telescope.utils.slugify(doc.name);
  doc.slug = Telescope.utils.getUnusedSlug(Countries, slug);
});

// generate slug on edit, if it has changed
Countries.before.update(function (userId, doc, fieldNames, modifier) {
  if (modifier.$set && modifier.$set.slug && modifier.$set.slug !== doc.slug) {
    modifier.$set.slug = Telescope.utils.getUnusedSlug(Countries, modifier.$set.slug);
  }
});

// add callback that adds countries CSS classes
function addCountryClass (postClass, post) {
  var classArray = _.map(Posts.getCountries(post), function (country){return "country-"+country.slug;});
  return postClass + " " + classArray.join(' ');
}
Telescope.callbacks.add("postClass", addCountryClass);

// ------- Countries Check -------- //

// make sure all countries in the post.countries array exist in the db
var checkCountries = function (post) {

  // if there are no countries, stop here
  if (!post.countries || post.countries.length === 0) {
    return;
  }

  // check how many of the countries given also exist in the db
  var countryCount = Countries.find({_id: {$in: post.countries}}).count();

  if (post.countries.length !== countryCount) {
    throw new Meteor.Error('invalid_country', 'invalid_country');
  }
};

function postsNewCheckCountries (post) {
  checkCountries(post);
  return post;
}
Telescope.callbacks.add("posts.new.sync", postsNewCheckCountries);

function postEditCheckCountries (post) {
  checkCountries(post);
  return post;
}
Telescope.callbacks.add("posts.edit.sync", postEditCheckCountries);

// TODO: debug this

// function addParentCountriesOnSubmit (post) {
//   var countries = post.countries;
//   var newCountries = [];
//   if (countries) {
//     countries.forEach(function (countryId) {
//       var country = Countries.findOne(countryId);
//       newCountries = newCountries.concat(_.pluck(country.getParents().reverse(), "_id"));
//       newCountries.push(country._id);
//     });
//   }
//   post.countries = _.unique(newCountries);
//   return post;
// }
// Telescope.callbacks.add("posts.new.sync", addParentCountriesOnSubmit);

// function addParentCountriesOnEdit (modifier, post) {
//   if (modifier.$unset && modifier.$unset.countries !== undefined) {
//     return modifier;
//   }

//   var countries = modifier.$set.countries;
//   var newCountries = [];
//   if (countries) {
//     countries.forEach(function (countryId) {
//       var country = Countries.findOne(countryId);
//       newCountries = newCountries.concat(_.pluck(country.getParents().reverse(), "_id"));
//       newCountries.push(country._id);
//     });
//   }
//   modifier.$set.countries = _.unique(newCountries);
//   return modifier;
// }
// Telescope.callbacks.add("posts.edit.sync", addParentCountriesOnEdit);
