'use strict';

let discordImages = {
	api: async function (server, channel, limit = '', token = '') {
		const api = discord.api.channelMessages(channel, limit);
		let meta, response, images;

		meta = {
			method: 'GET',
			localCache: true,
			headers: new Headers({
				'Authorization': 'Bot ' + atob(token)
			}),
		};

		response = await fetch(api, meta);
		images = await response.json();

		return images;
	},
	out: async function (server, channel, limit = '', token = '', view = 'grid') {
		let messages, id, author, avatar, timestamp, date;
		let attachments, attach_name, attach_url;
		let out;

		messages = await this.api(server, channel, limit, token);
		out = '';

		let i = 0;
		const j = messages.length;

		for (; i < j; i++) {
			id = messages[i].id;
			author = messages[i].author;
			avatar = author.avatar ? 'https://cdn.discordapp.com/avatars/' + author.id + '/' + author.avatar + '.png' : 'https://cdn-storage.github.io/images/logos/furry.01.001.512.svg.bg.png';
			attachments = messages[i].attachments;
			timestamp = messages[i].timestamp;
			date = new Date(messages[i].timestamp).toISOString().split('T')[0];

			let m = 0;
			const n = attachments.length;

			for (; m < n; m++) {
				attach_name = attachments[m].filename;
				attach_url = attachments[m].url;

				if (attachments.width !== null) {
					switch (view) {
						case 'grid':
							out += `
<div class="grid-cell">
	<article class="card" itemscope itemtype="http://schema.org/ImageObject">
		<div class="card-image">
			<figure class="image">
				<a href="${attach_url}" data-fancybox="gallery"><img src="${attach_url}" alt="" itemprop="contentUrl" /></a>
			</figure>
		</div>
		<div class="card-content">
			<div class="media">
				<div class="media-left">
					<figure class="image is-64x64"><img class="is-rounded" src="${avatar}" alt="" /></figure>
				</div>
				<div class="media-content">
					<h4 class="title is-4" itemprop="author">${he.escape(author.username)}</h4>
					<p class="subtitle is-7">
						<a class="has-text-grey-light" href="https://discordapp.com/channels/${server}/${channel}/${id}" rel="nofollow" target="_blank">
							<time datetime="${timestamp}">${date}</time>
						</a>
					</p>
				</div>
			</div>
		</div>
	</article>
</div>
`;
							break;
						default:
							console.log('View is not correct!');
					}
				}
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
