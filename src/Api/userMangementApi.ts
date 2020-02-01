import axios from 'axios';
import { config } from '../Common/commonConfig';
import { IUser } from 'interfaces/userInterface';

export const registerUser = (userToAdd: IUser): Promise<IUser> => {
    return axios.post<IUser>(`${config.userMangementBaseUrl}/users`, userToAdd, { headers: { 'Content-Type': 'application/json', 'Accept': '*/*' } })
        .then(res => {
            return res.data as IUser
        })
}

export const searchByUserName = (userName: string): Promise<IUser> => {
    return axios.get<IUser>(`${config.userMangementBaseUrl}/users/searchByUserName/${userName}`, { headers: { 'Content-Type': 'application/json', 'Accept': '*/*' } })
        .then(res => {
            return res.data as IUser
        })
}

export const getPageUsers = (skip: number): Promise<IUser[]> => {
    return axios.get<IUser[]>(`${config.userMangementBaseUrl}/users?skip=${skip}&limit=${config.defaultPageSize}`, { headers: { 'Content-Type': 'application/json', 'Accept': '*/*' } })
        .then(res => {
            return res.data as IUser[]
        })
}

export const getPageWithQuery = (userName:string,skip: number): Promise<IUser[]> => {
    return axios.get<IUser[]>(`${config.userMangementBaseUrl}/users/searchByQuery?userName=${userName}&skip=${skip}&limit=${config.defaultPageSize}`, { headers: { 'Content-Type': 'application/json', 'Accept': '*/*' } })
        .then(res => {
            return res.data as IUser[]
        })
}