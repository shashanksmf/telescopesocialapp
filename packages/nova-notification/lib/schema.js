import Telescope from 'meteor/nova:lib';
import Notification from "./collection.js";
import Users from 'meteor/nova:users';

const canInsert = user => Users.canDo(user, "notification.new");
const canEdit = user => Users.canDo(user, "notification.edit.all");

// country schema
Notification.schema = new SimpleSchema({
  to: {
    type: String,
    publish: true
  },
  postId: {
    type: String,
    publish: true
  },
  read: {
    type: Boolean,
    publish: true
  },
  message: {
    type: String,
    publish: true
  },
  date: {
    type: Date
  }
});

Notification.attachSchema(Notification.schema);

