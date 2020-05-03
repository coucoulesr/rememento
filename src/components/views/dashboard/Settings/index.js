import React from "react";
import cardStyles from "../styles/card-styles";
import { IconButton, Typography } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import axios from "axios";
import ChangePassword from "./ChangePassword";
import "../styles/settings.css";

class Settings extends React.Component {
  state = {
    addingRecipient: false,
    changingPassword: false,
    closingAccount: false,
    homeScreen: true,
    name: "",
    phone: "",
  };

  addRecipient = (e) => {
    e.preventDefault();
    const recipient = {
      name: this.state.name,
      phone: this.state.phone,
      id: this.props.recipients.length,
    };
    axios
      .request({
        url: "https://api.racoucoules.com/rememento",
        method: "POST",
        data: recipient,
        headers: {
          Authorization: this.props.token,
        },
      })
      .then(() => {
        this.props.toggleSettings();
      });
  };

  closeAccount = (e) => {
    e.preventDefault();
  };

  activateAddRecipient = () => {
    this.setState({
      ...this.state,
      addingRecipient: !this.state.addingRecipient,
      homeScreen: !this.state.homeScreen,
    });
  };

  activateChangePassword = () => {
    this.setState({
      ...this.state,
      changingPassword: !this.state.changingPassword,
      homeScreen: !this.state.homeScreen,
    });
  };

  activateCloseAccount = () => {
    this.setState({
      ...this.state,
      closingAccount: !this.state.closingAccount,
      homeScreen: !this.state.homeScreen,
    });
  };

  render() {
    return (
      <div style={flexCardStyles}>
        <IconButton
          style={{ alignSelf: "flex-end" }}
          onClick={this.props.toggleSettings}
        >
          <ClearIcon />
        </IconButton>
        <div style={settingsItemBlockStyle}>
          {this.state.homeScreen && this.props.recipients.length === 0 && (
            <a onClick={(e) => this.addRecipient(e)} className="settings-item">
              <Typography>Add recipient</Typography>
            </a>
          )}
          {this.state.homeScreen && (
            <div>
              <a
                onClick={(e) => {
                  this.activateChangePassword(e);
                }}
                className="settings-item"
              >
                <Typography>Change Password</Typography>
              </a>
              <a
                onClick={(e) => {
                  this.closeAccount(e);
                }}
                className="settings-item"
              >
                <Typography>Close Account</Typography>
              </a>
            </div>
          )}
          {this.state.changingPassword && (
            <ChangePassword
              activate={this.activateChangePassword}
              token={this.props.token}
            />
          )}
        </div>
      </div>
    );
  }
}

const settingsItemBlockStyle = {
  margin: "10px 0 20px 0",
  width: "100%",
};

const flexCardStyles = {
  ...cardStyles,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export default Settings;
