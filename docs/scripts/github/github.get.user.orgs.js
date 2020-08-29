'use strict';

let githubUserOrgs = {
	api: async function (user, token) {
		const api = github.api.user(user, '/orgs');
		let meta, response, user_repos;

		meta = {
			method: 'GET',
			localCache: true,
			headers: new Headers({
				'Authorization': 'Bot ' + atob(token)
			}),
		};

		response = await fetch(api, meta);
		user_repos = await response.json();

		return user_repos;
	},
	getUserOrgs: async function (user, token) {
		let user_repos = await this.api(user, token);
		let user_orgs = [];

		let i = 0;
		const j = user_repos.length;

		for (; i < j; i++) {
			user_orgs.push(user_repos[i].login);
		}

		return user_orgs;
	},
	getOrgRepos: async function (user, token) {
		let orgs = await this.getUserOrgs(user, token);
		let meta, response, org_repo, org_repos;

		org_repos = [];

		let i = 0;
		const j = orgs.length;

		for (; i < j; i++) {
			const api = github.api.org(orgs[i]);
			meta = {
				method: 'GET',
				localCache: true,
				headers: new Headers({
					'Authorization': 'Bot ' + atob(token)
				}),
			};

			response = await fetch(api, meta);
			org_repo = await response.json();

			org_repos.push(org_repo);
		}

		return org_repos;
	},
	out: async function (user, token) {
		let login, avatar, description, name, blog, location, email, repos, url, created, created_format,
			updated, updated_format;
		let out;

		let org_repos = await this.getOrgRepos(user, token);

		out = '';

		let i = 0;
		const j = org_repos.length;

		for (; i < j; i++) {
			login = org_repos[i].login;
			avatar = org_repos[i].avatar_url ? org_repos[i].avatar_url : '';
			description = org_repos[i].description ? org_repos[i].description : '';
			name = org_repos[i].name ? org_repos[i].name : org_repos[i].login;
			blog = org_repos[i].blog ? org_repos[i].blog : org_repos[i].html_url;
			location = org_repos[i].location ? org_repos[i].location : '';
			email = org_repos[i].email ? org_repos[i].email : '';
			repos = org_repos[i].public_repos;
			url = org_repos[i].html_url;
			created = org_repos[i].created_at;
			created_format = new Date(created).toISOString().split('T')[0];
			updated = org_repos[i].updated_at;
			updated_format = new Date(updated).toISOString().split('T')[0];

			out += `
<div class="grid-cell">
	<article class="card" data-org-login="${login}">
		<div class="card-content">
			<div class="media">
				<div class="media-left">
					<figure class="image is-64x64"><img title="" src="${avatar}" alt="" data-org-info="avatar" /></figure>
				</div>
				<div class="media-content">
					<h4 class="title is-4" data-org-info="name">${name}</h4>
					<p class="subtitle is-6"><a href="${url}" data-org-info="url">@${login}</a></p>
				</div>
			</div>
			<div class="content">
				<p data-org-info="description">${description}</p>
			</div>
		</div>
		<footer class="card-footer">
			<div class="card-footer-item">
				<div class="tags has-addons">
					<span class="tag"><span class="icon"><i class="fas fa-folder"></i></span></span>
					<span class="tag" data-org-count="repos">${repos}</span>
				</div>
			</div>
			<div class="card-footer-item">
				<div class="tags has-addons">
					<span class="tag"><span class="icon"><i class="fas fa-plus-square"></i></span></span>
					<span class="tag"><time datetime="${created}" data-org-time="created">${created_format}</time></span>
				</div>
			</div>
			<div class="card-footer-item">
				<div class="tags has-addons">
					<span class="tag"><span class="icon"><i class="fas fa-sync-alt"></i></span></span>
					<span class="tag"><time datetime="${updated}" data-org-time="updated">${updated_format}</time></span>
				</div>
			</div>
		</footer>
		<footer class="card-footer">
			<div class="card-footer-item">
				<div class="tags has-addons">
					<span class="tag"><span class="icon"><i class="fas fa-map-marker-alt"></i></span></span>
					<span class="tag" data-org-info="location">${location}</span>
				</div>
			</div>
			<div class="card-footer-item">
				<div class="tags has-addons">
					<span class="tag"><span class="icon"><i class="fas fa-envelope"></i></span></span>
					<span class="tag"><a href="mailto:${email}" data-org-info="email"><span class="icon"><i class="fas fa-envelope-open"></i></span></a></span>
				</div>
			</div>
			<div class="card-footer-item">
				<div class="tags has-addons">
					<span class="tag"><span class="icon"><i class="fas fa-link"></i></span></span>
					<span class="tag"><a href="${blog}" data-org-info="blog"><span class="icon"><i class="fas fa-home"></i></span></a></span>
				</div>
			</div>
		</footer>
	</article>
</div>
`;
		}

		return out;
	},
	html: async function (element, user, token) {
		let html;
		html = $(element).append(await this.out(user, token));

		return html;
	},
	run: function (element, user, token) {
		this.html(element, user, token);
	}
};
