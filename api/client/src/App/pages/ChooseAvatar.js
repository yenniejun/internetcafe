import React, { Component } from 'react';
import './styles/Main.css';
import homeIcon from './../img/home-button.png';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Redirect } from 'react-router-dom';
import AvatarModal from "./components/avatarModal"

class ChooseAvatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: this.props?.location?.state?.username ?? '',
          goToCafeList: false,
          avatar: "",
          redirectHome: !this.props?.location?.state?.username
        };
        console.log("CHOOSE AVATAR",this.state)
        this.handleClick = this.handleClick.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick(avatar) {
        this.setState({
            avatar: "Meeple" + avatar,
            goToCafeList: true
        })
    }

    // readyToCreate() {
    //     console.log("ready to create", this.state)
    //     if (!this.state.avatar) {
    //       alert("Please select an avatar") ;
    //       return false;
    //     }
    //     else { return true; }
    // }

    // handleSubmit(event) {
    //     event.preventDefault();
    //     if (this.readyToCreate()) {
    //         this.setState({goToCafeList: true})
    //     }         
    // }

    render() {
        return (
            <div className="choose-avatar-container">
                <div className={classNames("modal")}>
                    
                    {this.state.redirectHome && <Redirect to={'/'}/>}

                    { this.state.goToCafeList  && (
                        <Redirect 
                            to={{
                                pathname: './list',
                                state: {
                                    username: this.state.username,
                                    avatar: this.state.avatar
                                }
                            }}
                        />
                    )}

                    <div className={classNames("modal-title-container")}>
                        <Link to={'/'}><img className="home-icon" src={homeIcon} alt="home icon" /></Link>
                        <h1 className={classNames("modal-title", "modal-title-cafelist")}>Choose Your Meeple</h1>
                    </div>

                    <AvatarModal 
                        username={this.state.username}
                        handleClick={this.handleClick}
                    />

                </div>
            </div>
        );
    }
}

export default ChooseAvatar;