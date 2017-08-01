Meteor.startup(function(){
setTimeout(function(){
	var script = document.createElement('script');
script.setAttribute('type', 'text/javascript');  // optional
script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD19U3ToWPVJpnFk7AGRT8O68qfO2sUaJ0&libraries=places&callback=initAutocomplete');
//document.getElementsByTagName('head')[0].appendChild(script);
},3000)
    //$.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyD19U3ToWPVJpnFk7AGRT8O68qfO2sUaJ0&libraries=places&callback=initAutocomplete', function(){
    //    console.log(" google  map script laoded"); 
  //  });
});