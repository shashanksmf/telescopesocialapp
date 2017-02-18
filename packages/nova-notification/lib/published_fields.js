import Notification from './collection.js'
import PublicationsUtils from 'meteor/utilities:smart-publications';

Notification.publishedFields = {};

/**
 * @summary Specify which fields should be published by the countries publication
 * @array Notification.publishedFields.list
 */
Notification.publishedFields.list = PublicationsUtils.arrayToFields([
  'to','postId','read','message','date'
]);