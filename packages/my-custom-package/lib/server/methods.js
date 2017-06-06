
Meteor.methods({

 'sendPushNotification':function(push_username, push_message) {
    console.log("Test");
    // Array of UserIDs where we want to send the message.
    var userIdsToPushNotify = ['Gx9avcjkYQ5ooZFFz'];

     Push.send({
      from: 'push',
      title: push_username,
      text: push_message,
      badge: 1,
      sound: 'chime',
      query: {
        userId: {
          $in: userIdsToPushNotify
        }
      }
    });

  },
//in this directory app is working fine...wait its building

  // 'sendPushNotification':function(push_username, push_message) {

  //   // Array of UserIDs where we want to send the message.
  //   var userIdsToPushNotify = ['B7ph2o2oCDj5R3H6H'];

  //   return Push.send({
  //     from: 'push',
  //     title: push_username,
  //     text: push_message,
  //     badge: 1,
  //     sound: 'chime',
  //     query: {
  //       userId: {
  //         $in: userIdsToPushNotify
  //       }
  //     }
  //   });

  // },

  onNotificationClick () {
    // on notification click
  }
});
