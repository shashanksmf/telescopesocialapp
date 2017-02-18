import Users from 'meteor/nova:users';

const anonymousActions = [
  "motifications.view.all"
];
Users.groups.anonymous.can(anonymousActions);

const defaultActions = [
  "notifications.view.all"

];
Users.groups.default.can(defaultActions);

const adminActions = [
  "notifications.view.all",
  "notifications.new",
  "notifications.edit.all",
  "notifications.remove.all"
];
Users.groups.admins.can(adminActions);
