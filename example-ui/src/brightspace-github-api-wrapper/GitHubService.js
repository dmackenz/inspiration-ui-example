const { LoginEndpointWrapper } = require('./endponts/login')
const { RepoEndpointWrapper } = require('./endponts/repo')

exports.GitHubService = () => {

    const BASE_URL = "https://2q6heq8wp5.execute-api.us-east-2.amazonaws.com/dev/app"

    const loginToApp = async () => {
        return await LoginEndpointWrapper.login();
    }

    const isUserLoggedIn = async () => {
        return await LoginEndpointWrapper.isLoggedIn()
    }

    const getRepoList = async (username) => {
        return await RepoEndpointWrapper.getRepoList(username)
    }

    const getRepoArchiveLink = async (username, repo_name) => {
        return await RepoEndpointWrapper.getRepoArchiveLink(username, repo_name)
    }

    return {
        loginToApp,
        isUserLoggedIn,
        getRepoList,
        getRepoArchiveLink,
        BASE_URL
    }
}