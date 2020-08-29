'use strict';

let discordMessages = {
	api: async function (server, channel, limit = '', token = '') {
		const api = discord.api.channelMessages(channel, limit);
		let meta, response, messages;

		meta = {
			method: 'GET',
			localCache: true,
			headers: new Headers({
				'Authorization': 'Bot ' + atob(token)
			}),
		};

		response = await fetch(api, meta);
		messages = await response.json();

		return messages;
	},
	out: async function (server, channel, limit = '', token = '', view = 'feed') {
		let messages, id, author, avatar, timestamp, edited_timestamp, date, content;
		let mentions, mention_id, mention_name;
		let attachments, attach_name, attach_url, out_attach;
		let converter, out;

		converter = new showdown.Converter();

		messages = await this.api(server, channel, limit, token);
		out = '';

		let i = 0;
		const j = messages.length;

		for (; i < j; i++) {
			id = messages[i].id;
			author = messages[i].author;
			avatar = author.avatar ? 'https://cdn.discordapp.com/avatars/' + author.id + '/' + author.avatar + '.png' : 'https://cdn-storage.github.io/images/logos/furry.01.001.512.svg.bg.png';
			attachments = messages[i].attachments;
			content = converter.makeHtml(messages[i].content);
			timestamp = messages[i].timestamp;
			edited_timestamp = messages[i].edited_timestamp ? messages[i].edited_timestamp : timestamp;
			mentions = messages[i].mentions;
			date = new Date(messages[i].timestamp).toISOString().split('T')[0];

			/**
			 * Mentions parser.
			 * ------------------------------------------------------------------------------------------------------ */

			let m = 0;
			const n = mentions.length;

			for (; m < n; m++) {
				mention_id = new RegExp('\\<\\@\\!(\\d+)?' + mentions[m].id + '\\>', 'gi');
				mention_name = '<mark class="mention">' + he.escape(mentions[m].username) + '</mark>';

				content = content.replace(mention_id, mention_name);
			}

			/**
			 * Attachments parser.
			 * ------------------------------------------------------------------------------------------------------ */

			out_attach = '';

			let k = 0;
			const l = attachments.length;

			for (; k < l; k++) {
				attach_name = attachments[k].filename;
				attach_url = attachments[k].url;

				if (attachments[k].width !== null) {
					out_attach += '<a href="' + attach_url + '" data-fancybox="gallery"><img src="' + attach_url + '" alt="' + attach_name + '" /></a>';
				} else {
					out_attach += '<a href="' + attach_url + '" rel="nofollow" target="_blank">' + attach_name + '</a>';
				}
			}

			/**
			 * Emoji parser.
			 * ------------------------------------------------------------------------------------------------------ */

			content = discord.parser.emoji(content);

			/**
			 * Out HTML.
			 * ------------------------------------------------------------------------------------------------------ */

			switch (view) {
				case 'feed':
					out += `
<div class="grid-cell">
	<article class="card" itemscope itemtype="http://schema.org/Article">
		<div class="card-content">
			<div class="media" itemprop="author" itemscope itemtype="http://schema.org/Person">
				<div class="media-left">
					<figure class="image is-64x64"><img class="is-rounded" src="${avatar}" alt="" itemprop="image" /></figure>
				</div>
				<div class="media-content">
					<h4 class="title is-4" itemprop="name">${he.escape(author.username)}</h4>
					<p class="subtitle is-7">
						<a class="has-text-grey-light" href="https://discordapp.com/channels/${server}/${channel}/${id}" rel="nofollow" target="_blank">
							<time datetime="${timestamp}">${date}</time>
						</a>
					</p>
				</div>
			</div>
			<div class="content" itemprop="headline">${content}</div>
			<div class="attachments" itemprop="image">${out_attach}</div>
		</div>
		<meta itemprop="datePublished" content="${timestamp}" />
		<meta itemprop="dateModified" content="${edited_timestamp}" />
	</article>
</div>
`;
					break;
				default:
					console.log('View is not correct!');
			}
		}

		return out;
	},
	html: async function (server, channel, limit, token, view, element) {
		let html;
		html = $(element).append(await this.out(server, channel, limit, token, view));

		return html;
	},
	run: function (server, channel, limit, token, view, element) {
		this.html(server, channel, limit, token, view, element);
	}
};
