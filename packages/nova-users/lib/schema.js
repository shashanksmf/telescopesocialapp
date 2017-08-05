import Telescope from 'meteor/nova:lib';
import Users from './collection.js';
import AutoCompleteLocation from 'meteor/google-maps-autocomplete';

const adminGroup = {
  name: "admin",
  order: 10
};

// check if user can create a new user
const canInsert = user => Users.canDo(user, "users.new");

// check if user can edit a user
const canEdit = Users.canEdit;

// check if user can edit *all* users
const canEditAll = user => Users.canDo(user, "users.edit.all");

/**
 * @summary Vote schema
 * @type {SimpleSchema}
 */
Telescope.schemas.votes = new SimpleSchema({
  itemId: {
    type: String
  },
  power: {
    type: Number,
    optional: true
  },
  votedAt: {
    type: Date,
    optional: true
  }
});

/**
 * @summary User Data schema
 * @type {SimpleSchema}
 */
Telescope.schemas.userData = new SimpleSchema({
  /**
    Bio (Markdown version)
  */
  bio: {
    type: String,
    optional: true,
    // control: "textarea",
    // insertableIf: canInsert,
    // editableIf: canEdit,
    // form: {
    //   rows: 5
    // }
  },
  /**
    Total comment count
  */
  commentCount: {
    type: Number,
    publish: true,
    optional: true
  },
  /**
    The name displayed throughout the app. Can contain spaces and special characters, doesn't need to be unique
  */
  displayName: {
    type: String,
    optional: true,
    publish: true,
    profile: true,
    control: "text",
    insertableIf: canInsert,
    editableIf: canEdit
  },
  /**
    An array containing comment downvotes
  */
  downvotedComments: {
    type: [Telescope.schemas.votes],
    publish: false,
    optional: true
  },
  /**
    An array containing posts downvotes
  */
  downvotedPosts: {
    type: [Telescope.schemas.votes],
    publish: false,
    optional: true
  },
  /**
    The user's email. Modifiable.
  */
  email: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Email,
    required: true,
    control: "text",
    insertableIf: canInsert,
    editableIf: canEdit
    // unique: true // note: find a way to fix duplicate accounts before enabling this
  },
  /**
    A hash of the email, used for Gravatar // TODO: change this when email changes
  */
  emailHash: {
    type: String,
    publish: true,
    optional: true
  },
  /**
    The HTML version of the bio field
  */
  htmlBio: {
    type: String,
    publish: true,
    profile: true,
    optional: true,
    // form: {
    //   omit: true
    // },
    template: "user_profile_bio"
  },
  /**
    The user's karma
  */
  karma: {
    type: Number,
    decimal: true,
    publish: true,
    optional: true
  },
  /**
    Total post count
  */
  postCount: {
    type: Number,
    publish: true,
    optional: true
  },
  /**
    A blackbox modifiable object to store the user's settings
  */
  // settings: {
  //   type: Object,
  //   optional: true,
  //   editableIf: canEdit,
  //   blackbox: true,
  //   form: {
  //     omit: true
  //   }
  // },
  /**
    The user's profile URL slug // TODO: change this when displayName changes
  */
  slug: {
    type: String,
    publish: true,
    optional: true
  },
  /**
    The user's Twitter username
  */
  twitterUsername: {
    type: String,
    optional: true,
    publish: true,
    profile: true,
    // control: "text",
    // insertableIf: canInsert,
    // editableIf: canEdit,
    template: "user_profile_twitter"
  },
  /**
    An array containing comments upvotes
  */
  upvotedComments: {
    type: [Telescope.schemas.votes],
    publish: false,
    optional: true
  },
  /**
    An array containing posts upvotes
  */
  upvotedPosts: {
    type: [Telescope.schemas.votes],
    publish: false,
    optional: true
  },
  /**
    A link to the user's homepage
  */
  website: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    publish: true,
    profile: true,
    optional: true,
    // control: "text",
    // insertableIf: canInsert,
    // editableIf: canEdit
  },
  /**
    Groups
  */
  groups: {
    type: [String],
    optional: true,
    control: "checkboxgroup",
    insertableIf: canEditAll,
    editableIf: canEditAll,
    form: {
      options: function () {
        const groups = _.without(_.keys(Users.groups), "anonymous", "default", "admins");
        return groups.map(group => {return {value: group, label: group};});
      }
    },
  },
  fullName: {
    type: String,
    publish: true,
    optional: true,
    control: "text",
    insertableIf: canInsert,
    editableIf: canEdit
  },
  city: {
    type: String,
    publish: true,
    optional: true,
    control: "text",
    insertableIf: canInsert,
    editableIf: canEdit
  },
    location: {
    type: [Object],
    publish: true,
    optional: true,
    control: "googleAutoComplete",
    blackbox: true,
    editableIf: canEdit
  }

});

/**
 * @summary Users schema
 * @type {SimpleSchema}
 */
Users.schema = new SimpleSchema({
  _id: {
    type: String,
    publish: true,
    optional: true
  },
  username: {
    type: String,
    // regEx: /^[a-z0-9A-Z_]{3,15}$/,
    publish: true,
    optional: true
  },
  emails: {
    type: [Object],
    optional: true
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    optional: true
  },
  "emails.$.verified": {
    type: Boolean,
    optional: true
  },
  createdAt: {
    type: Date,
    publish: true,
    optional: true
  },
  isAdmin: {
    type: Boolean,
    label: "Admin",
    control: "checkbox",
    optional: true,
    insertableIf: canEditAll,
    editableIf: canEditAll,
    group: adminGroup
    // form: {
    //   omit: true
    // }
  },
  profile: {
    type: Object,
    optional: true,
    blackbox: true
  },
  telescope: { // telescope-specific data
    type: Telescope.schemas.userData,
    optional: true
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  }
});

// Meteor.startup(function(){
//   Users.internationalize();
// });

/**
 * @summary Attach schema to Users (Meteor.users at the moment) collection
 */
Users.attachSchema(Users.schema);
