import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { disconnectFetch } from '../Actions/login';
import { translate } from "react-translate"
import './LoginPage/LoginPage.css';

class Header extends Component {
  renderRedirect = () => {
    if (this.props.disconnect === true) {
      return <Redirect to='/' />
    }
  }

  render(){
    const { t } = this.props;
    return (
      <div className="App-header">
        {this.renderRedirect()}
        <h1 className="App-title">{t("Title")}</h1>
        <div className="user-card">
        {
          (this.props.username === "")?
            <Link to="/createAccount">Create Account</Link> :
            <span onClick={() => this.props.fetchDisconnect(this.props.token)}>{this.props.username}</span>
        }
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    username : (( state.user.username )? state.user.username : ""),
    token : state.user.token,
    disconnect: state.user.disconnect,
  };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDisconnect: (token) => dispatch(disconnectFetch(token)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(translate("Header")(Header));
