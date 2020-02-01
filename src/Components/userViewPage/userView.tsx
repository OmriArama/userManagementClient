import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as userActions from '../../Actions/UserActions';
import { IUser } from '../../interfaces/userInterface';
import * as userMangementApi from '../../Api/userMangementApi'
import InfiniteScroll from 'react-infinite-scroll-component';
import './userView.css';
import logo from '../../Assests/logo.png';
import { DataDiv } from './dataDiv';

type State = {
    usersToShow: IUser[],
    hasMore: boolean,
    search: string
}

type mapDispatchToPropsType = {
    addUsers: (usersToadd: IUser[]) => void;
    zeroSkip: () => void;
    reloadUsers: (users: IUser[]) => void
}

type mapStateToPropsType = {
    loadedUsers: IUser[];
    skip: number;
}

type Props = mapStateToPropsType & mapDispatchToPropsType

class UserView extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            usersToShow: props.loadedUsers,
            hasMore: true,
            search: ''
        }
        this.loadMoreUsers()
    }

    static getDerivedStateFromProps(props: Props) {
        if (props.loadedUsers.length !== 0) {
            return {
                usersToShow: props.loadedUsers
            }
        }
        return null
    }

    loadMoreUsers = () => {
        if (this.state.search === '') {
            userMangementApi.getPageUsers(this.props.skip)
                .then((res: IUser[]) => {
                    if (res.length < 10) {
                        this.setState({
                            hasMore: false
                        })
                    }
                    this.props.addUsers(res);
                })
        }
        else {
            userMangementApi.getPageWithQuery(this.state.search, this.props.skip)
                .then(users =>
                    this.props.reloadUsers(users)
                )
        }
    }

    setSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        let skip = this.props.skip;
        if (this.props.skip !== 0) {
            this.props.zeroSkip();
            skip = 0;
        }
        if (event.target.value === '') {
            userMangementApi.getPageUsers(skip)
                .then((res: IUser[]) => {
                    if (res.length < 10) {
                        this.setState({
                            hasMore: false
                        })
                    }
                    this.props.reloadUsers(res);
                })
        }
        else {
            userMangementApi.getPageWithQuery(event.target.value, skip)
                .then(users =>
                    this.props.reloadUsers(users)
                )
        }
        this.setState({
            search: event.target.value
        })
    }

    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
            <div> <img src={logo} alt={'logo'} />
                    <input onChange={this.setSearch} className={'styledInput'} placeholder={'search by userName'} />
                </div>

                <InfiniteScroll
                    dataLength={this.props.loadedUsers.length}
                    next={this.loadMoreUsers}
                    hasMore={this.state.hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <div>
                            <p style={{ textAlign: 'center' }}>
                                <b>No More Users!</b>
                            </p>
                        </div>
                    }
                >
                    <div className={'userInfoDiv'} style={{ 'backgroundColor': 'lightblue' }}>
                        <span className={'styledSpan'}>First name</span>
                        <span className={'styledSpan'}>Last name </span>
                        <span className={'styledSpan'}>Email</span>
                        <span className={'styledSpan'}>User name</span>
                        <span className={'styledSpan'}>Company position</span>
                    </div>
                    {this.state.usersToShow.map((userToShow, index) => (
                        <div key={index}>
                            <DataDiv
                                currIndex={index}
                                userToShow={userToShow}
                            />
                        </div>
                    ))}
                </InfiniteScroll>

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        addUsers: (usersToAdd: IUser[]) => { dispatch(userActions.addUsers(usersToAdd)) },
        zeroSkip: () => { dispatch(userActions.zeroingPage()) },
        reloadUsers: (users: IUser[]) => { dispatch(userActions.reloadUsers(users)) }
    }
}

const mapStateToProps = (state: any): mapStateToPropsType => {
    return {
        loadedUsers: state.loadedUsers,
        skip: state.usersToSkip

    }
}

export default connect<mapStateToPropsType, mapDispatchToPropsType>(
    mapStateToProps,
    mapDispatchToProps
)(UserView)