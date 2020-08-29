'use strict';

let discord = {
	api: {
		channel: function (channel) {
			let out;
			out = 'https://discordapp.com/api/channels/' + channel;

			return out;
		},
		channelMessages: function (channel, limit) {
			let out;
			out = 'https://discordapp.com/api/channels/' + channel + '/messages?limit=' + limit;

			return out;
		},
		channelMessage: function (channel, message) {
			let out;
			out = 'https://discordapp.com/api/channels/' + channel + '/messages/' + message;

			return out;
		},
		pinnedMessages: function (channel) {
			let out;
			out = 'https://discordapp.com/api/channels/' + channel + '/pins';

			return out;
		},
		guildChannels: function (guild) {
			let out;
			out = 'https://discordapp.com/api/guilds/' + guild + '/channels';

			return out;
		},
		guildMember: function (guild, user) {
			let out;
			out = 'https://discordapp.com/api/guilds/' + guild + '/members/' + user;

			return out;
		},
		listGuildMembers: function (guild) {
			let out;
			out = 'https://discordapp.com/api/guilds/' + guild + '/members';

			return out;
		}
	},
	parser: {
		emoji: function (content) {
			let emoji_id, emoji_name, out;

			emoji_id = /<:(.+):(\d+)>/gi;
			emoji_name = '<img class="ext-emoji" src="https://cdn.discordapp.com/emojis/$2.png" alt="$1" draggable="false" />';

			out = content.replace(emoji_id, emoji_name);

			return out;
		},
		url: function (content) {
			let get, set, out;

			get = /((?:https?:\/\/)([\d\w\.\-]+[\w]{2,6})(?:[^\s\]\[\<\>]*)\/?)/gi;
			set = '<a href="$1" rel="nofollow" target="_blank">$2</a>';

			out = content.replace(get, set);

			return out;
		}
	}
};
