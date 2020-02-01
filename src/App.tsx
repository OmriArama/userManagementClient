import React from 'react';
import './App.css';
import RegistrationPage from './Components/registrationPage/registrationPage';
import { IUser } from 'interfaces/userInterface';
import { connect } from 'react-redux';
import UserView from './Components/userViewPage/userView';
import { Dispatch } from 'redux';
import * as usersAction from './Actions/UserActions';

type mapStateToPropsType = {
  loggedUser: IUser;
  currentPage: number;
}

type mapDispatchToPropsType = {
  addUsers: (users: IUser[]) => void;
}
type Props = mapStateToPropsType;

class App extends React.Component<Props, {}> {



  render() {
    return (
      this.props.loggedUser ?
        <UserView /> :
        < RegistrationPage />
    );
  }
}

const mapStateToProps = (state: any): mapStateToPropsType => {
  return {
    loggedUser: state.loggedUser as IUser,
    currentPage: state.currentUserPage
  }
}

const mapDispatchToPropsType = (dispatch: Dispatch): mapDispatchToPropsType => {
  return {
    addUsers: (users: IUser[]) => { dispatch(usersAction.addUsers(users)) }
  }
}
export default connect<mapStateToPropsType, mapDispatchToPropsType>(
  mapStateToProps,
  mapDispatchToPropsType
)(App)