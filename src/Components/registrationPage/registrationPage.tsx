import React, { Fragment } from 'react';
import { Dispatch } from 'redux'
import './registrationPage.css'
import logo from '../../Assests/logo.png';
import { validateForm } from '../../Common/commonFunctions'
import { IUser } from 'interfaces/userInterface';
import * as userManagementApi from '../../Api/userMangementApi'
import { connect } from 'react-redux';
import * as UserActions from '../../Actions/UserActions';

type State = {
    ToRegister: boolean,
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    password: string;
    position: string
};

type MapDispatchToPropsType = {
    loginUser: (userToRegister: IUser) => void
}


type Props = MapDispatchToPropsType
class RegistrationPage extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            ToRegister: true,
            firstName: '',
            lastName: '',
            email: '',
            userName: '',
            password: '',
            position: ''
        }
    }

    changeInputState = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const key = event.target.name;

        if (Object.keys(this.state).includes(key)) {
            this.setState({ [key]: event.target.value } as Pick<State, any>);
        }
    }

    login = () => {
        userManagementApi.Login(this.state.userName, this.state.password)
            .then(foundUser => {
                this.props.loginUser(foundUser)
            })
    }

    changeLoginStatus = () => {
        this.setState({
            ToRegister: !this.state.ToRegister
        })
    }
    submitForm = () => {
        if (validateForm(this.state)) {
            const userToCreate: IUser = {
                email: this.state.email,
                firstName: this.state.firstName,
                userName: this.state.userName,
                lastName: this.state.lastName,
                password: this.state.password,
                position: this.state.position
            }
            userManagementApi.registerUser(userToCreate)
                .then(user => {
                    this.props.loginUser(user)
                })
        }

    }

    render() {
        return (
            <Fragment>
                <img src={logo} alt={'logo'} />
                {this.state.ToRegister ?
                    <div className={'form'}>
                        <Fragment> <div>
                            <input onChange={this.changeInputState} type={'text'} name={'firstName'} placeholder={'First name'} />
                            <input onChange={this.changeInputState} type={'text'} name={'lastName'} placeholder={'Last name'} />
                        </div>
                            <div><input onChange={this.changeInputState} className={'singleInput'} type={'text'} name={'email'} placeholder={'Email'} /></div>
                            <div><input onChange={this.changeInputState} className={'singleInput'} type={'text'} name={'userName'} placeholder={'Username'} /></div>
                            <div><input onChange={this.changeInputState} className={'singleInput'} type={'text'} name={'password'} placeholder={'Password'} /></div>
                            <div><input onChange={this.changeInputState} className={'singleInput'} type={'text'} name={'position'} placeholder={'Company position'} /></div>

                            <div className={'actionsDiv'}>
                                <button onClick={this.submitForm}>Sign Up</button>
                                <span onClick={this.changeLoginStatus} className={'loginSpan'}>or continue with existing account</span>

                            </div></Fragment></div > :
                    <div>
                        <div className={'loginForm'}>
                            <div style={{ marginTop: '10%' }}>
                                <div><input onChange={this.changeInputState} className={'singleInput'} type={'text'} name={'userName'} placeholder={'Username'} /></div>
                                <div><input onChange={this.changeInputState} className={'singleInput'} type={'text'} name={'password'} placeholder={'Password'} /></div>
                            </div>
                            <div className={'actionsDiv'}>
                                <button onClick={this.changeLoginStatus}>Sign Up</button>
                                <button onClick={this.login} className={'loginButton'}>Login</button>

                            </div>
                        </div>
                    </div>
                }

            </Fragment>

        )
    }
}

const MapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        loginUser: (userToLogin: IUser) => { dispatch(UserActions.loginUser(userToLogin)) }
    }
}


export default connect<{}, MapDispatchToPropsType>(
    null,
    MapDispatchToProps
)(RegistrationPage)