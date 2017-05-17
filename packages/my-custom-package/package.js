Package.describe({
  name: "my-custom-package"
});

Package.onUse( function(api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'fourseven:scss',

    'nova:core',
    'nova:base-components',
    'nova:posts',
    'nova:users',
	'nova:forms-tags',
  'nova:custom-autoform',
  'nova:countries',
  'nova:notification',
  'nova:notifications'
    ]);

  api.addFiles([
    'lib/modules.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/stylesheets/custom.scss',
    'lib/stylesheets/customPostPage.scss',
   // 'lib/stylesheets/CustomNotification.scss'
  ], ['client']);

  api.addFiles([
    'lib/server/templates.js'
  ], ['server']);

  api.addAssets([
    'lib/server/emails/customNewPost.handlebars',
    'lib/server/emails/customEmail.handlebars'
  ], ['server']);

      api.addAssets([
      'lib/stylesheets/UbuntuTitlingBold.ttf',
       'lib/components/public/releasarylogo.png'
    ], ['client']);

});
