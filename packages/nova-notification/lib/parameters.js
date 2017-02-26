import Telescope from 'meteor/nova:lib';
import notification from "./collection.js";

// notification Posts Parameters
// Add a "notifications" property to terms which can be used to filter *all* existing Posts views. 
function addnotificationParameter (parameters, terms) {
  return parameters;
}
Telescope.callbacks.add("notification.parameters", addnotificationParameter);