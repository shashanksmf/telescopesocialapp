import Users from 'meteor/nova:users';

const anonymousActions = [
   "notification.view.all",
  "notification.new",
  "notification.edit.all",
  "notification.remove.all"
];
Users.groups.anonymous.can(anonymousActions);

const defaultActions = [
   "notification.view.all",
  "notification.new",
  "notification.edit.all",
  "notification.remove.all"

];
Users.groups.default.can(defaultActions);

const adminActions = [
  "notification.view.all",
  "notification.new",
  "notification.edit.all",
  "notification.remove.all"
];
Users.groups.admins.can(adminActions);
