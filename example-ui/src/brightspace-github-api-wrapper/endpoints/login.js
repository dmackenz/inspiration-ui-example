const got = require('got')
const open = require('open')
const { GitHubService } = require('../GitHubService')


exports.LoginEndpointWrapper = () => {

    const loginToApp = async () => {
        open( `${GitHubService.BASE_URL}/login`, function (err) {
            if ( err ) {
                throw err;
            }    
        });
    }

    const isUserLoggedIn = async () => {
        try {
            const resp = await got.get(
                '/logged_in', {
                    baseUrl: GitHubService.BASE_URL
                }
            )
            return resp.authenticated
        } catch (error) {
            console.log(`${error}`)
        }
    }

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
        loginToApp,
        isLoggedIn
    }
}