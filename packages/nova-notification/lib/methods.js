import { Meteor } from 'meteor/meteor';
import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import Notification from "./collection.js";

Meteor.methods({
  
});

// assign smart methods on startup so the method code generated takes care of countries' custom fields (extended schema) -> prevent bug on create/edit countries with custom fields
Meteor.startup(() => {
  Countries.smartMethods({
    createName: "countries.new",
    editName: "countries.edit"
  });
});