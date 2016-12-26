import Telescope from 'meteor/nova:lib';
import Countries from "../collection.js";

// Load countries from settings, if there are any

if (Meteor.settings && Meteor.settings.countries) {
  Meteor.settings.countries.forEach(country => {

    // get slug (or slugified name)
    const slug = country.slug || Telescope.utils.slugify(country.name);

    // look for existing country with same slug
    let existingCountry = Countries.findOne({slug: slug});

    if (existingCountry) {
      // if country exists, update it with settings data except slug
      delete country.slug;
      Countries.update(existingCountry._id, {$set: country});
    } else {
      // if not, create it
      Countries.insert(country);
      console.log(`// Creating country “${country.name}”`);
    }
  });
}
