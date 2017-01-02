import Telescope from 'meteor/nova:lib';
import Countries from "./collection.js";
import Users from 'meteor/nova:users';

const canInsert = user => Users.canDo(user, "countries.new");
const canEdit = user => Users.canDo(user, "countries.edit.all");

// country schema
Countries.schema = new SimpleSchema({
  name: {
    type: String,
    insertableIf: canInsert,
    editableIf: canEdit,
    publish: true
  },
  

  slug: {
    type: String,
    optional: true,
    insertableIf: canInsert,
    editableIf: canEdit,
    publish: true
  },
  icon: {
    type: String,
    optional: true,
    insertableIf: canInsert,
    editableIf: canEdit,
    publish: true
  }

});

// Meteor.startup(function(){
//   Countries.internationalize();
// });

Countries.attachSchema(Countries.schema);


Telescope.settings.collection.addField([
  {
    fieldName: 'countriesBehavior',
    fieldSchema: {
      type: String,
      optional: true,
      form: {
        group: 'countries',
        instructions: 'Let users filter by one or multiple countries at a time.', 
        options: function () {
          return [
            {value: "single", label: "countries_behavior_one_at_a_time"},
            {value: "multiple", label: "countries_behavior_multiple"}
          ];
        }
      }
    }
  },
  {
    fieldName: 'hideEmptyCountries',
    fieldSchema: {
      type: Boolean,
      optional: true,
      form: {
        group: 'countries',
        instructions: 'Hide empty countries in navigation'
      }
    }
  }
]);