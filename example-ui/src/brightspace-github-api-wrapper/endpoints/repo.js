const got = require('got')
const open = require('open')
const { GitHubService } = require('../GitHubService')


exports.RepoEndpointWrapper = () => {

    const getRepoList = async (username) => {
        try {
            const resp = await got.get(
                `/repo/${username}`, {
                    baseUrl: GitHubService.BASE_URL
                }
            )
            return resp.repos
        } catch (error) {
            console.log(`${error}`)
        }
    }

    const getRepoArchiveLink = async (username, repo_name) => {
        try {
            const resp = await got.get(
                `/repo/${username}/${repo_name}/link`, {
                    baseUrl: GitHubService.BASE_URL
                }
            )
            return resp.url
        } catch (error) {
            console.log(`${error}`)
        }
    }

    return {
        getRepoList,
        getRepoArchiveLink
    }
}