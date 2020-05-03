import React from "react";
import { TextField, IconButton, Typography } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import {
  textFieldContainerStyles,
  formButtonsStyles,
  textFieldStyles,
} from "../styles/card-styles";
import { connect } from "react-redux";
import axios from "axios";
import APIURL from '../../../../config.js'

class ChangePassword extends React.Component {
  state = {
    oldPassword: "",
    newPassword1: "",
    newPassword2: "",
    oldPasswordError: null,
    newPasswordError: null,
  };

  comparePasswords = () => {
    if (this.state.newPassword1 !== this.state.newPassword2) {
      this.setState({ ...this.state, newPasswordError: true });
      return false;
    } else {
      this.setState({ ...this.state, newPasswordError: false });
      return true;
    }
  };

  submit = (e) => {
    if (e) e.preventDefault();
    if (this.comparePasswords()) {
      axios
        .request({
          url: APIURL + "/change-password",
          method: "POST",
          data: {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword1,
          },
          headers: {
            Authorization: this.props.token,
          },
        })
        .then(() => {
          this.setState({ ...this.state, oldPasswordError: false });
          alert("Password changed successfully");
          this.props.activate();
        })
        .catch((err) => {
          this.setState({ ...this.state, oldPasswordError: err });
        });
    }
  };

  render() {
    return (
      <form
        onSubmit={(e) => this.submit(e)}
        onReset={() => this.props.activate()}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Change Password</Typography>
        <div style={textFieldContainerStyles}>
          <TextField
            fullWidth
            type="password"
            size="small"
            error={this.state.oldPasswordError}
            helperText={this.state.oldPasswordError && "Invalid password"}
            value={this.state.oldPassword}
            onChange={(e) =>
              this.setState({ ...this.state, oldPassword: e.target.value })
            }
            label="Old Password"
            variant="filled"
            style={textFieldStyles}
          />
          <TextField
            fullWidth
            type="password"
            size="small"
            value={this.state.newPassword1}
            onChange={(e) =>
              this.setState({ ...this.state, newPassword1: e.target.value })
            }
            label="New Password"
            variant="filled"
            style={textFieldStyles}
          />
          <TextField
            fullWidth
            type="password"
            size="small"
            error={this.state.newPasswordError}
            helperText={this.state.newPasswordError && "Passwords must match"}
            value={this.state.newPassword2}
            onChange={(e) => {
              this.setState({ ...this.state, newPassword2: e.target.value });
              //   this.comparePasswords();
            }}
            label="Repeat New Password"
            variant="filled"
            style={textFieldStyles}
          />
        </div>
        <div style={formButtonsStyles}>
          <IconButton type="submit">
            <CheckCircleIcon style={{ color: "green" }} />
          </IconButton>
          <IconButton type="reset">
            <CancelIcon style={{ color: "red" }} />
          </IconButton>
        </div>
      </form>
    );
  }
}

export default connect()(ChangePassword);
