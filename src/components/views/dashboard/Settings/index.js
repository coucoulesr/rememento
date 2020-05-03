import React from "react";
import cardStyles from "../styles/card-styles";
import { IconButton, Typography } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import ChangePassword from "./ChangePassword";
import CloseAccount from "./CloseAccount";
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
        <div
          style={{
            marginBottom: "-5px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="subtitle1"
            style={{ padding: "10px 15px", color: "#bbb" }}
          >
            Settings
          </Typography>
          <IconButton
            style={{ padding: "5px", margin: "5px" }}
            onClick={this.props.toggleSettings}
          >
            <ClearIcon />
          </IconButton>
        </div>
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
                  this.activateCloseAccount(e);
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
          {this.state.closingAccount && (
            <CloseAccount
              activate={this.activateCloseAccount}
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
