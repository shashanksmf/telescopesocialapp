Package.describe({
  name: "nova:notification",
  summary: "Telescope tags package",
  version: "0.27.4-nova",
});

Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'nova:core@0.27.4-nova',
    'nova:lib@0.27.4-nova',
    'nova:posts@0.27.4-nova',
    'nova:users@0.27.4-nova',
    
  ]);

  api.mainModule("lib/server.js", "server");
  api.mainModule("lib/client.js", "client");

});