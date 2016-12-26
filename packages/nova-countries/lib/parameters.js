import Telescope from 'meteor/nova:lib';
import Countries from "./collection.js";

// Country Posts Parameters
// Add a "countries" property to terms which can be used to filter *all* existing Posts views. 
function addCountryParameter (parameters, terms) {

  var cat = terms.cat || terms["cat[]"];

  // filter by country if country slugs are provided
  if (cat) {

    var countriesIds = [];
    var selector = {};

    if (typeof cat === "string") { // cat is a string
      selector = {slug: cat};
    } else if (Array.isArray(cat)) { // cat is an array
      selector = {slug: {$in: cat}};
    }

    // get all countries passed in terms
    var countries = Countries.find(selector).fetch();
    
    // for each country, add its ID and the IDs of its children to countriesId array
    countries.forEach(function (country) {
      countriesIds.push(country._id);
      countriesIds = countriesIds.concat(_.pluck(Countries.getChildren(country), "_id"));
    });

    parameters.selector.countries = {$in: countriesIds};
  }
  return parameters;
}
Telescope.callbacks.add("posts.parameters", addCountryParameter);