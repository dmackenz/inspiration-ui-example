import { LoginEndpointWrapper, ILoginEndpointWrapper } from './endpoints/login'
import { RepoEndpointWrapper, IRepoEnpointWrapper } from './endpoints/repo'

export interface IGitHubService {
    loginToApp: () => any
    isUserLoggedIn: () => Promise<boolean>
    getRepoList: (username: string) => Promise<string[]>
    getRepoArchiveLink: (username: string, repo_name: string) => Promise<string>
    BASE_URL: string
}

export const BASE_URL: string = "https://2q6heq8wp5.execute-api.us-east-2.amazonaws.com/dev/app"

export const GitHubService = (): IGitHubService => {
    const loginEndpointWrapper: ILoginEndpointWrapper = LoginEndpointWrapper();
    const repoEndpointWrapper: IRepoEnpointWrapper = RepoEndpointWrapper();

    const loginToApp = async () => {
        return await loginEndpointWrapper.login();
    }

    const isUserLoggedIn = async (): Promise<boolean> => {
        return await loginEndpointWrapper.isLoggedIn()
    }

    const getRepoList = async (username: string): Promise<string[]> => {
        return await repoEndpointWrapper.getRepoList(username)
    }

    const getRepoArchiveLink = async (username: string, repo_name: string) => {
        return await repoEndpointWrapper.getRepoArchiveLink(username, repo_name)
    }

    return {
        loginToApp,
        isUserLoggedIn,
        getRepoList,
        getRepoArchiveLink,
        BASE_URL
    }
}