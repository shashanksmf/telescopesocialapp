import { Meteor } from 'meteor/meteor';
import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import Countries from "./collection.js";

Meteor.methods({
  "countries.deleteById": function (countryId) {
    
    check(countryId, String);
    
    const currentUser = this.userId && Users.findOne(this.userId);

    if (Users.canDo(currentUser, "countries.remove.all")) {

      // delete country
      Countries.remove(countryId);

      // find any direct children of this country and make them root countries
      Countries.find({parentId: countryId}).forEach(function (country) {
        Countries.update(country._id, {$unset: {parentId: ""}});
      });

      // find any posts with this country and remove it
      var postsUpdated = Posts.update({countries: {$in: [countryId]}}, {$pull: {countries: countryId}}, {multi: true});

      return postsUpdated;

    }
  }
});

// assign smart methods on startup so the method code generated takes care of countries' custom fields (extended schema) -> prevent bug on create/edit countries with custom fields
Meteor.startup(() => {
  Countries.smartMethods({
    createName: "countries.new",
    editName: "countries.edit"
  });
});