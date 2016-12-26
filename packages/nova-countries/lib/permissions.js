import Users from 'meteor/nova:users';

const anonymousActions = [
  "countries.view.all",
"countries.new",
  "countries.edit.all",
  "countries.remove.all"
];
Users.groups.anonymous.can(anonymousActions);

const defaultActions = [
  "countries.view.all",
"countries.new",
  "countries.edit.all",
  "countries.remove.all"
];
Users.groups.default.can(defaultActions);

const adminActions = [
  "countries.view.all",
  "countries.new",
  "countries.edit.all",
  "countries.remove.all"
];
Users.groups.admins.can(adminActions);
