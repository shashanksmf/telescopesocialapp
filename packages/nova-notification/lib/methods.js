import {Meteor} from 'meteor/meteor';
import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import Notification from "./collection.js";

Meteor.methods({
    'notification.insert': function (notification) {
        Notification
            .insert(notification, function (error, result) {
                if (error) {
                    return {"response": false, "error": error}
                }
                return result;
            })
    },
    'notification.markRead': function (id) {

        Notification
            .update({
                _id: id
            }, {
                $set: {
                    read: true
                }
            }, function (error, result) {
                if (error) {
                    return error;
                }
                return result;
            });
        // return true;
    },
    'notification.fetchunread': function (id) {
        return Notification
            .find({"to": id,read:false})
            .fetch();
    }
});

// assign smart methods on startup so the method code generated takes care of
// countries' custom fields (extended schema) -> prevent bug on create/edit
// countries with custom fields
Meteor.startup(() => {
    Notification.smartMethods({createName: "notification.new", editName: "notification.edit"});
});
