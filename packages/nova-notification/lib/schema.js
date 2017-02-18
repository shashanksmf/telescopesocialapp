import Telescope from 'meteor/nova:lib';
import Notifications from "./collection.js";
import Users from 'meteor/nova:users';

const canInsert = user => Users.canDo(user, "countries.new");
const canEdit = user => Users.canDo(user, "countries.edit.all");

// country schema
Notifications.schema = new SimpleSchema({
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

Notifications.attachSchema(Notifications.schema);

