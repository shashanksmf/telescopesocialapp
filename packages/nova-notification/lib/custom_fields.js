import PublicationUtils from 'meteor/utilities:smart-publications';
import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import Notification from "./collection.js";

// check if user can create a new post
const canInsert = user => Users.canDo(user, "notification.new");
// check if user can edit a post
const canEdit = Users.canEdit;

// Posts.addField(
//    {
//     fieldName: 'countries',
//     fieldSchema: {
//       type: [String],
//       control: "checkboxgroup",
//       optional: true,
//       insertableIf: canInsert,
//       editableIf: canEdit,
	  
//       form: {
//         noselect: true,
//         type: "bootstrap-country",
//         order: 50,
//         options: function () {
//           var countries = Countries.find().map(function (country) {
//             return {
//               value: country._id,
//               label: country.name
//             };
//           });
//           return countries;
//         }
//       },
//       publish: true,
//       join: {
//         joinAs: "countriesArray",
//         collection: () => Countries
//       }
//     }
//   } 
  
// );

PublicationUtils.addToFields(Posts.publishedFields.list, ["notification"]);
