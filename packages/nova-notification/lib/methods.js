import { Meteor } from 'meteor/meteor';
import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import Notification from "./collection.js";

Meteor.methods({
  'notification.insert':function(notification){
  	 Notification.insert(notification,function(error,result){
  	 	if(error) {
  	 		return {"response":false,"error":error}
  	 	}
  	 	return result;
  	 	})
  },
  'notification.markRead':function(id){

    Notification.update({_id:id},{$set:{read:true}},function(error,result){
      if(error) {
       console.log("error server",error)
        return error;
      }
      console.log("error server",result)
       
      return result;
    });
   // return true;
  },
  'notification.fetchunread':function(id){

    Notification.find({"to":id} , function(error,result){
      if(error) {
        return error;
      }
      return result
    });
  }
});

// assign smart methods on startup so the method code generated takes care of countries' custom fields (extended schema) -> prevent bug on create/edit countries with custom fields
Meteor.startup(() => {
  Notification.smartMethods({
    createName: "notification.new",
    editName: "notification.edit"
  });
});