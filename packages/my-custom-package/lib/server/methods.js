var Future = Npm.require( 'fibers/future' );

Meteor.methods({

 'sendPushNotification':function(push_username, push_message) {
    console.log("Test");
    // Array of UserIDs where we want to send the message.
    var userIdsToPushNotify = [Meteor.userId()];

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

'getGooglePlaces':function(place){
  console.log("server method called",place);
   var future = new Future();
 // var response = Meteor.wrapAsync(callGooglePlaces);
 // var responseRes = response(place)
 // console.log("response res",responseRes)
 // return responseRes;
 Meteor.http.get("https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+place+"&types=(cities)&language=en_US&key=AIzaSyD19U3ToWPVJpnFk7AGRT8O68qfO2sUaJ0",  function(err, result) {
  //console.log("inside http",err,result);
    
    if (!err) {
      future.return(result);
    } else {
        //future.return(err);      
    }

  });



    // do something with the result.
return future.wait();

},


  onNotificationClick () {
    // on notification click
  }
});


var callGooglePlaces = function(place) {
  Meteor.http.get("https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+place+"&types=(cities)&language=en_US&key=AIzaSyD19U3ToWPVJpnFk7AGRT8O68qfO2sUaJ0",  function(err, result) {
  //console.log("inside http",err,result);
    
    if (!err) {
      return result
    }
    return err;
  });
}