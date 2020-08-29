'use strict';

let github = {
	api: {
		org: function (org, url = '') {
			let out;
			out = 'https://api.github.com/orgs/' + org + url;

			return out;
		},
		user: function (user, url = '') {
			let out;
			out = 'https://api.github.com/users/' + user + url;

			return out;
		}
	}
};
