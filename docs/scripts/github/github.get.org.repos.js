'use strict';

let githubOrgRepos = {
	api: async function (org, token) {
		const api = github.api.org(org, '/repos');
		let meta, response, repos;

		meta = {
			method: 'GET',
			localCache: true,
			headers: new Headers({
				'Authorization': 'Bot ' + atob(token)
			}),
		};

		response = await fetch(api, meta);
		repos = await response.json();

		return repos;
	},
	out: async function (org, token) {
		let name, full_name, avatar, url, description, updated, updated_format, homepage, homepage_icon,
			license_id, license_key, forks, issues, watchers;
		let out;

		let repos = await this.api(org, token);

		out = '';

		let i = 0;
		const j = repos.length;

		for (; i < j; i++) {
			name = repos[i].name;
			full_name = repos[i].full_name ? repos[i].full_name : repos[i].name;
			avatar = repos[i].owner.avatar_url ? repos[i].owner.avatar_url : '';
			url = repos[i].html_url;
			description = repos[i].description ? repos[i].description : '';
			updated = repos[i].updated_at;
			updated_format = new Date(updated).toISOString().split('T')[0];
			homepage = repos[i].homepage ? repos[i].homepage : repos[i].html_url;
			homepage_icon = repos[i].homepage ? 'fas fa-home' : 'fab fa-github-alt';
			license_id = repos[i].license.spdx_id ? repos[i].license.spdx_id : '';
			license_key = repos[i].license.key ? repos[i].license.key : '';
			forks = repos[i].forks;
			issues = repos[i].open_issues;
			watchers = repos[i].watchers;

			out += `
<div class="grid-cell">
	<article class="card">
		<div class="card-content">
			<div class="media">
				<div class="media-left">
					<figure class="image is-64x64"><img title="${full_name}" src="${avatar}" alt="${name}" /></figure>
				</div>
				<div class="media-content">
					<h4 class="title is-4">${name}</h4>
					<p class="subtitle is-6"><a href="${url}">${full_name}</a></p>
				</div>
			</div>
			<div class="content">
				<p>${description}</p>
			</div>
		</div>
		<footer class="card-footer">
			<div class="card-footer-item">
				<div class="tags has-addons">
					<span class="tag"><span class="icon"><i class="fas fa-code-branch"></i></span></span>
					<span class="tag">${forks}</span>
				</div>
			</div>
			<div class="card-footer-item">
				<div class="tags has-addons">
					<span class="tag"><span class="icon"><i class="fas fa-info-circle"></i></span></span>
					<span class="tag">${issues}</span>
				</div>
			</div>
			<div class="card-footer-item">
				<div class="tags has-addons">
					<span class="tag"><span class="icon"><i class="fas fa-eye"></i></span></span>
					<span class="tag">${watchers}</span>
				</div>
			</div>
		</footer>
		<footer class="card-footer">
			<div class="card-footer-item">
				<div class="tags has-addons">
					<span class="tag"><span class="icon"><i class="fas fa-sync-alt"></i></span></span>
					<span class="tag"><time datetime="${updated}">${updated_format}</time></span>
				</div>
			</div>
			<div class="card-footer-item">
				<div class="tags has-addons">
					<span class="tag"><span class="icon"><i class="far fa-copyright"></i></span></span>
					<span class="tag"><a href="https://choosealicense.com/licenses/${license_key}/">${license_id}</a></span>
				</div>
			</div>
			<div class="card-footer-item">
				<div class="tags has-addons">
					<span class="tag"><span class="icon"><i class="fas fa-link"></i></span></span>
					<span class="tag"><a href="${homepage}"><span class="icon"><i class="${homepage_icon}"></i></span></a></span>
				</div>
			</div>
		</footer>
	</article>
</div>
`;
		}

		return out;
	},
	html: async function (element, org, token) {
		let html;
		html = $(element).append(await this.out(org, token));

		return html;
	},
	run: function (element, org, token) {
		this.html(element, org, token);
	}
};
