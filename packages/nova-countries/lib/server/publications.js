import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import Countries from "../collection.js";

Meteor.publish('countries', function() {
  
  const currentUser = this.userId && Users.findOne(this.userId);

  if(Users.canDo(currentUser, "posts.view.approved.all")){
    
    var countries = Countries.find({}, {fields: Countries.publishedFields.list});
    var publication = this;

    countries.forEach(function (country) {
      var childrenCountries = country.getChildren();
      var countryIds = [country._id].concat(_.pluck(childrenCountries, "_id"));
      var cursor = Posts.find({$and: [{countries: {$in: countryIds}}, {status: Posts.config.STATUS_APPROVED}]});
      // Counts.publish(publication, country.getCounterName(), cursor, { noReady: true });
    });

    return countries;
  }
  return [];
});