import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import Telescope from 'meteor/nova:lib';
import Upload from 'meteor/xavcz:nova-forms-upload';
import NovaForm from 'meteor/nova:forms';
//import CustomAutoForm from './components/CustomAutoForm.jsx';
import Tags from 'meteor/nova:forms-tags';
import CustomAutoForm from 'meteor/nova:custom-autoform';
/*
Let's assign a color to each post (why? cause we want to, that's why).
We'll do that by adding a custom field to the Posts collection.
Note that this requires our custom package to depend on nova:posts and nova:users.
*/

// check if user can create a new post
const canInsert = user => Users.canDo(user, "posts.new");
// check if user can edit a post
const canEdit = Users.canEdit;
const RelDateCountry = new Mongo.Collection("RelDateCountry");
 RelDateCountry.schema = new SimpleSchema({
  country:{
    type: String,
    optional: true
  },
   price:{
    type: String,
    optional: true
  },
   reldate:{
    type: Date,
    optional: true,
  },
  reldate_local:{
    type: String,
    optional: true,
  },
  currencyIcon:{
    type: String,
    optional: true,
  }
});
RelDateCountry.attachSchema(RelDateCountry.schema);
Posts.addField(
  [
  {
  fieldName: 'image',
  fieldSchema: {
    type: String,
    optional: true,
    publish: true,
    control: Upload,
    insertableIf: canInsert,
    editableIf: canEdit,
    form: {
      options: {
		//  preset: Telescope.settings.get('cloudinaryPresets').posts
      },
    }
  }
} 
 

,
  // {
  //   fieldName: 'color',
  //   fieldSchema: {
  //     type: String,
  //     control: "select", // use a select form control
  //     optional: true, // this field is not required
  //     insertableIf: canInsert,
  //     editableIf: canEdit,
  //     form: {
  //       options: function () { // options for the select form control
		// //console.log("selected");
	 //      return [
  //           {value: "white", label: "White"},
  //           {value: "yellow", label: "Yellow"},
  //           {value: "blue", label: "Blue"},
  //           {value: "red", label: "Red"},
  //           {value: "green", label: "Green"}
  //         ];
  //       }
  //     },
  //     publish: true // make that field public and send it to the client
  //   }
  // },
 //     {
	// fieldName:"product",
 //    fieldSchema: {
 //      type: Boolean,
 //      control: "checkbox", // use a select form control
 //      optional: true, // this field is not required
 //      insertableIf: canInsert,
 //      editableIf: canEdit,
 //    defaultValue: false,
 //      publish: true	  // make that field public and send it to the client
	
	// } 
 //  },
 //  {
	// fieldName:"release_Date",
 //    fieldSchema: {
 //      type: Date,
 //      control: "datetime", // use a select form control
 //      optional: true, // this field is not required
 //      insertableIf: canInsert,
 //      editableIf: canEdit,
	//   defaultValue: false,
 //      publish: true, // make that field public and send it to the client

	// } 
  //},
    {
    fieldName: 'categories',
    fieldSchema: {
      type: [String],
      control: Tags,
      optional: true,
      insertableIf: canInsert,
      editableIf: canEdit,
      autoform: {
        options: function () {
          var categories = Categories.find().map(function (category) {
            return {
              value: category._id,
              label: category.name
            };
          });
          return categories;
        }
      },
      publish: true,
      join: {
        joinAs: "categoriesArray",
        collection: () => Categories
      }
    }
	},
	 {
    fieldName: "customArray11",
    fieldSchema: {
      type: [RelDateCountry.schema],
      control: "customArray",
      optional: true,
      insertableIf: canInsert,
      editableIf: canEdit,
      publish:true,
       defaultValue: false,
    }
  }
  
  
  ]
);



/*
The main post list view uses a special object to determine which fields to publish,
so we also add our new field to that object:
*/

import PublicationUtils from 'meteor/utilities:smart-publications';

PublicationUtils.addToFields(Posts.publishedFields.list, ["color","product","image","customArray11"]);



// extends Posts schema with a new field: 'image' 🏖
/* import Telescope from 'meteor/nova:lib';
import Upload from 'meteor/xavcz:nova-forms-upload'
Posts.addField({
  fieldName: 'image',
  fieldSchema: {
    type: String,
    optional: true,
    publish: true,
    control: Upload,
    insertableIf: canInsert,
    editableIf: canEdit,
    form: {
      options: {
      //  preset: Telescope.settings.get('cloudinaryPresets').posts // this setting refers to the transformation you want to apply to the image
		
      },
    }
  }
});

PublicationUtils.addToFields(Posts.publishedFields.list, ["image"]); */