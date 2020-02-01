import { IUser } from 'interfaces/userInterface';

const LOGIN_USER = 'LOGIN_USER';
const ADD_USERS = 'ADD_USERS';
const RELOAD_USERS = 'RELOAD_USERS';
const ZERO_PAGE = 'ZERO_PAGE';


export const loginUser = (user: IUser) => {
    return { type: LOGIN_USER, payload: user };
}

export const addUsers = (userToADD: IUser[]) => {
    return { type: ADD_USERS, payload: userToADD, };
}

export const reloadUsers = (users: IUser[]) => {
    return { type: RELOAD_USERS, payload: users };
}

export const zeroingPage=()=>{
    return { type:ZERO_PAGE}
}

