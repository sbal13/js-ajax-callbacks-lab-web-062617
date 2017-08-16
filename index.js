$(document).ready( () => {
});


	function searchRepositories(){
		var target = $("#searchTerms")[0].value
		$.get(`https://api.github.com/search/repositories?q=${target}`, function (data) {

			var repoLIs = data.items.map(repo=>{

				return `<li>
					<img src="${repo.owner.avatar_url}" height="50" width="50">
					<a href="${repo.owner.html_url}">${repo.owner.login}</a><br>
					<a href="${repo.svn_url}">${repo.name}</a> - <p>${repo.description}</p>
					<a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this)">Show Commits</a>
				</li>`
			}).join('')

			var itemsList = `
			<ul>
				${repoLIs}
			</ul>
			`
			window.$("#results").html(itemsList)

		}).fail(displayError)
	}

	function displayError(error){
		$("#errors").html(`I'm sorry, there's been an error. Please try again.`)
	}

	function showCommits(el){

		var repoName = el.dataset.repository
		var owner = el.dataset.owner
		var commitsUrl = `https://api.github.com/repos/${owner}/${repoName}/commits`

		$.get(commitsUrl, function(data) {

			var commitLIs = data.map(commit=>{
				if (commit.author){
					return `
						<li>
							<img src="${commit.author.avatar_url}" height="50" width="50">
							<p>Name: ${commit.commit.author.name}</p>
							<p>Username: ${commit.author.login}</p>
							<p>SHAL: ${commit.sha}</p>
						</li>
					`
				} else {return}
			})

			var commitList = 
			`
			<ul>
				${commitLIs}
			</ul>
			`

			$("#details").html(commitList)
		})


	}

