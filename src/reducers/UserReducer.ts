import { IInitialState, initialState } from '../interfaces/initialState'
import { config } from 'Common/commonConfig'


export const userReducer = (state: IInitialState = initialState, action: any): IInitialState => {
    switch (action.type) {
        case 'ADD_USERS':
            return { ...state, usersToSkip: state.usersToSkip + config.defaultPageSize, loadedUsers: state.loadedUsers.concat(action.payload) }
        case 'LOGIN_USER':
            return { ...state, loggedUser: action.payload }
        case 'RELOAD_USERS':
            return { ...state, loadedUsers: action.payload }
        case 'ZERO_PAGE':
            return { ...state, usersToSkip: 0 }
        default:
            return state
    }

}