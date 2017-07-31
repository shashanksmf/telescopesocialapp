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
  'nova:notifications',
  'raix:push'
    ]);

  api.addFiles([
    'lib/modules.js'
  ], ['client', 'server']);

 api.addAssets([
    'public/share.png'
  ], ['client','server']);

  api.addFiles([
    'lib/stylesheets/custom.scss',
    'lib/stylesheets/customPostPage.scss',
    'lib/stylesheets/mobileStyle.scss',
    'lib/stylesheets/categoriesMenu.scss',
    
    // 'lib/stylesheets/CustomNotification.scss',
    'lib/client/cordova.js'
  ], ['client']);

  api.addFiles([
    'lib/server/templates.js',
    'lib/server/methods.js',
    'lib/server/cordova.js'
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
