
import { BASE_URL } from '../GitHubService'
import axios from "axios"

export interface IRepoEnpointWrapper {
    getRepoList: (username: string) => Promise<string[]>
    getRepoArchiveLink: (username: string, repo_name: string) => Promise<string>
}

export const RepoEndpointWrapper = () => {

    const getRepoList = async (username: string): Promise<string[]> => {
        const resp: any = await axios.get(`${BASE_URL}/repo/${username}`)
        return resp.data.repos.map((repo: { repoName: string }) => repo.repoName)
    }

    const getRepoArchiveLink = async (username: string, repo_name: string): Promise<string> => {
        const resp = await axios.get(`${BASE_URL}/repo/${username}/${repo_name}/link`)
        return resp.data.url
    }

    return {
        getRepoList,
        getRepoArchiveLink
    }
}