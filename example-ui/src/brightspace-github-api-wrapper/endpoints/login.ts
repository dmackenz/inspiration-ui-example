import { BASE_URL } from '../GitHubService'
import axios from "axios"

export interface ILoginEndpointWrapper {
    login: () => Promise<string>
    isLoggedIn: () => Promise<boolean>
}

export const LoginEndpointWrapper = (): ILoginEndpointWrapper => {

    const loginToApp = async (): Promise<string> => {
        return `${BASE_URL}/login`;
    }

    const isUserLoggedIn = async () => {
        const resp: any = await axios.get(`${BASE_URL}/logged_in`)
        return resp.data.authenticated
    }

    return {
        login: loginToApp,
        isLoggedIn: isUserLoggedIn
    }
}