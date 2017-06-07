
function configurePush() {
	Push.debug = true;
	console.log('Push: configuring...');

	Push.allow({
		send: function(userId/*, notification*/) {
			return true;
		}
	});

	let apn, gcm;

	gcm = {
		apiKey: 'AIzaSyAlSmG40MwRae3ibvQlKhCjgzJ6kPEbNm4', // Google Server key
		projectNumber: '438508748888' // Google console project #
	};

	apn = {
		passphrase: '',
		keyData: '',
		certData: ''
	};

	if (!apn.keyData || apn.keyData.trim() === '' || !apn.certData || apn.certData.trim() === '') {
		apn = undefined;
	}

	if (!gcm.apiKey || gcm.apiKey.trim() === '' || !gcm.projectNumber || gcm.projectNumber.trim() === '') {
		gcm = undefined;
	}

	Push.Configure({
		apn: apn,
		gcm: gcm,
		production: true,
		sendInterval: 1000,
		sendBatchSize: 10
	});

	return Push.enabled = true;
}

Meteor.startup(function() {
	return configurePush();
});
