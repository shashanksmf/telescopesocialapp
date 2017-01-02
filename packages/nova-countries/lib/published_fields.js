import Countries from './collection.js'
import PublicationsUtils from 'meteor/utilities:smart-publications';

Countries.publishedFields = {};

/**
 * @summary Specify which fields should be published by the countries publication
 * @array Countries.publishedFields.list
 */
Countries.publishedFields.list = PublicationsUtils.arrayToFields([
  "name","slug","icon"
]);