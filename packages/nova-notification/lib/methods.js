import { Meteor } from 'meteor/meteor';
import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import Notification from "./collection.js";

Meteor.methods({
  'notification.insert':function(notification){
  	console.log("call data",notification)
  	 Notification.insert(notification,function(error,result){
  	 	if(error) {
  	 		return {"response":false,"error":error}
  	 	}
  	 	return result;
  	 	})
  }
});

// assign smart methods on startup so the method code generated takes care of countries' custom fields (extended schema) -> prevent bug on create/edit countries with custom fields
Meteor.startup(() => {
  Notification.smartMethods({
    createName: "notification.new",
    editName: "notification.edit"
  });
});