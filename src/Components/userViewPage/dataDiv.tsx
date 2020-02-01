import React from 'react';
import { IUser } from 'interfaces/userInterface';
import './userView.css';

type Props = {
    userToShow: IUser,
    currIndex: number
}

export const DataDiv = (props: Props) => {

    return (
        <div className={'userInfoDiv'} style={{ 'backgroundColor': (props.currIndex % 2) === 0 ? 'whitesmoke' : 'lightgray' }}>
            <span className={'styledSpan'}>{props.userToShow.firstName}</span>
            <span className={'styledSpan'}>{props.userToShow.lastName}</span>
            <span className={'styledSpan'}>{props.userToShow.email}</span>
            <span className={'styledSpan'}>{props.userToShow.userName}</span>
            <span className={'styledSpan'}>{props.userToShow.position}</span>
        </div>
    )
}