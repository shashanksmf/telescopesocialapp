import Telescope from 'meteor/nova:lib';
import Countries from "./collection.js";

// Country Posts Parameters
// Add a "countries" property to terms which can be used to filter *all* existing Posts views. 
function addCountryParameter (parameters, terms) {

  var country = terms.country || terms["country[]"];

  // filter by country if country slugs are provided
  if(country){
    // do nothing
  //} else if (country) {

    var countriesIds = [];
    var selector = {};

    if (typeof country === "string") { // country is a string
      selector = {slug: country};
    } else if (Array.isArray(country)) { // country is an array
      selector = {slug: {$in: country}};
    }

    // get all countries passed in terms
    var countries = Countries.find(selector).fetch();
    
    // for each country, add its ID and the IDs of its children to countriesId array
    countries.forEach(function (country) {
      countriesIds.push(country._id);
      countriesIds = countriesIds.concat(_.pluck(Countries.getChildren(country), "_id"));
    });

    //parameters.selector.countries = {$in: countriesIds};
  //  parameters.selector.customArray11 = {'$elemMatch':{ 'country' : country }};
//  } else {
    //parameters.selector.customArray11 = {'$elemMatch':{ 'country' : 'uk' }};
  }
  return parameters;
}
Telescope.callbacks.add("posts.parameters", addCountryParameter);