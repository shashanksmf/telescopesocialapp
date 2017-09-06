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
  _id:{
    type:String,
    optional:true,
    autoValue : function(){
     // console.log("autovalue",this);
      if(!this.value) {
        return Meteor.uuid();
      }
      //return Meteor.uuid();
    }
  },
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
    optional:true
  },
  reldate_local:{
    type: String,
    optional: true
  },
  currencyIcon:{
    type: String,
    optional: true,
  },
  vendorName: {
    type: String,
    optional: true,
  },
  sourceUrl: {
    type: String,
    optional: true,
  }
});
RelDateCountry.attachSchema(RelDateCountry.schema);

const ImageSlider = new Mongo.Collection("ImageSlider");
 ImageSlider.schema = new SimpleSchema({

  type:{
    type: String,
    optional: true
  },
   url:{
    type: String,
    optional: true
  },

  
});
ImageSlider.attachSchema(ImageSlider.schema);

const VideoSlider  = new Mongo.Collection("VideoSlider");
VideoSlider.schema = new SimpleSchema({

  type:{
    type: String,
    optional: true
  },
   url:{
    type: String,
    optional: true
  }
});
VideoSlider.attachSchema(VideoSlider.schema);

SimpleSchema.messages({
  "productReleaseDateMinCountError": "Please Select ReleaseDate of the Post",
  "minCount":"[label] You must specify atleast one value"
});


Users.addField([{
 
  fieldName: 'image',
  fieldSchema: {
    type: [ImageSlider.schema],
    optional: true,
    publish: true,
    control: Upload,
    insertableIf: canInsert,
    editableIf: canEdit,
    order:1,
    form: {
      options: {
    //  preset: Telescope.settings.get('cloudinaryPresets').posts
      },
    }
  }


}])

Posts.addField(
  [
  {
  fieldName: 'image',
  fieldSchema: {
    type: [ImageSlider.schema],
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
}, 

  {
  fieldName: 'video',
  fieldSchema: {
    type: String,
    optional: true,
    publish: true,
    control:"video",
    insertableIf: canInsert,
    editableIf: canEdit,
    
  }
},
 {
  fieldName: 'producturl',
  fieldSchema: {
    type: String,
    optional: true,
    publish: true,
    insertableIf: canInsert,
    editableIf: canEdit,
    
  }
},
  {
  fieldName: 'showmovies',
  fieldSchema: {
    type: String,
      optional: false,

     insertableIf: canInsert,
    editableIf: canEdit,
    publish: true,
    control:"select",
    form:  {
        options: [
        {label: "Movies", value: "Movies"},
        {label: "Sports", value: "Sports"},
        {label: "Event", value: "Event"},
         {label: "Product", value: "Product"}
      ],
    }
  }
},
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
    fieldName: "productReleaseDate",
    fieldSchema: {
      label:"ReleaseDate",
      type: [RelDateCountry.schema],
      control: "customArray",
      insertableIf: canInsert,
      editableIf: canEdit,
      custom:function(){
        console.log("custom",this)
      },
      optional:function(){
        console.log("optional",this)
      },
      publish:true
    }
  },
  {
    fieldName: "Genre",
    fieldSchema: {
      type: String ,
      control: "input",
      optional: true,
      insertableIf: canInsert,
      editableIf: canEdit,
      publish:true
    }
  },
  {
    fieldName: "Ratings",
    fieldSchema: {
      type: String ,
      control: "input",
      optional: true,
      insertableIf: canInsert,
      editableIf: canEdit,
      publish:true
    }
  }
  
  
  ]
);



/*
The main post list view uses a special object to determine which fields to publish,
so we also add our new field to that object:
*/

import PublicationUtils from 'meteor/utilities:smart-publications';

PublicationUtils.addToFields(Posts.publishedFields.list, ["color","product","image","productReleaseDate","video","Genre","showmovies","producturl"]);

PublicationUtils.addToFields(Users.publishedFields.list, ["image"]);



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