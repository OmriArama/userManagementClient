import { IUser } from './userInterface';

export interface IInitialState {
    loadedUsers: IUser[];
    loggedUser: IUser | null;
    usersToSkip:number;
}

export const initialState: IInitialState = {
    loadedUsers:[],
    loggedUser:null,   
    usersToSkip:0   
}