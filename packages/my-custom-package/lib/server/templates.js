/* 
Register email templates.
*/

import './emails/config.js';

import NovaEmail from 'meteor/nova:email';

NovaEmail.addTemplates({
  newPost: Assets.getText("lib/server/emails/customNewPost.handlebars"),
  customEmail: Assets.getText("lib/server/emails/customEmail.handlebars")
});