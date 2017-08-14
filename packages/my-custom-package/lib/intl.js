/*
  Let's add an international label to the field added in custom_fields.js
*/

import Telescope from 'meteor/nova:lib';

Telescope.strings.en = {
  ...Telescope.strings.en, // get all the string translated
  "posts.color": "Color",
  "posts.image": "Image",
  "posts.userUpvotedPosts":"Favourite",
  "posts.body":"Description",
  "posts.Categories":"Categories",
  "posts.customArray11":"Additional Info",
  "posts.video":"video",
  "posts.Genre":"Genre",
  "posts.Ratings":"Ratings"
  // add a new one (collection.field: "Label")
};
