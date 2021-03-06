if (Meteor.isCordova) {
  Push.addListener('token', function(token) {
    // alert(JSON.stringify(token));
  });

  

  Push.addListener('startup', function(notification) {
    console.log("notification startup",notification);
    Meteor.call('onNotificationClick', (error, result) => {
      console.log("notification clicked",error,result);
      // on notification click method
    });


  
    // var host = Meteor.absoluteUrl().replace(/\/$/, '');
    // if (Servers.serverExists(host) !== true) {
    //   return;
    // }
    // return Servers.startServer(host, '/', function(err, url) {
    //   if (err != null) {
    //     return console.log(err);
    //   }
    // });
  });
  Meteor.startup(function() {
   
    return Tracker.autorun(function() {

      return Push.Configure({
        android: {
          senderID:  Meteor.settings.public.gcm.senderId, // Google console project #
          alert: true,
          badge: true,
          sound: true,
          vibrate: true,
          clearNotifications: true
        },
        ios: {
          badge: true,
          clearBadge: true,
          sound: true,
          alert: true
        }
      });

    });
  });
}
