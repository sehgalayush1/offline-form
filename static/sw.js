console.log('Started', self);
self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed', event);
});
self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});

self.addEventListener('sync', event => {
	if (event.tag == 'send-form') {
		event.waitUntil(
			getFormFromOutbox().then(form => {
				return fetch('/send', {
					method: 'POST',
					body: JSON.stringify(form),
					headers: { 'Content-Type': 'application/json' }
				}).then(() => {
					return removeFormFromOutbox(form);
				});
			})
		);
	}
});