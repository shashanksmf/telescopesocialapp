// This section sets up some basic app metadata, the entire section is optional.
App.info({
    id: 'com.shashanksmf.demo',
    name: 'Nova',
    description: 'Nova app',
    author: 'Telescope Development Team',
    email: 'info@shashanksmf.com',
    website: 'http://shashanksmf.com'
});

// Set PhoneGap/Cordova preferences.
// App.setPreference('BackgroundColor', '0xff0000ff');
// App.setPreference('HideKeyboardFormAccessoryBar', true);
// App.setPreference('Orientation', 'default');
// App.setPreference('Orientation', 'all', 'ios');
App.accessRule('*');

App.configurePlugin('phonegap-plugin-push', {
  SENDER_ID: '438508748888' // Google console project #
});
