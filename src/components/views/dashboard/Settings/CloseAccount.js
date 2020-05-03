import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { TextField, IconButton, Typography } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import {
  textFieldContainerStyles,
  formButtonsStyles,
  textFieldStyles,
} from "../styles/card-styles";
import cookie from 'react-cookies';

class CloseAccount extends React.Component {
  state = {
    password: "",
    passwordError: false,
    accountDeleted: false,
  };

  submit = (e) => {
    e.preventDefault();
    let input = prompt(
      'Do you really want to close your account? This action cannot be undone. To continue, type "delete" in the text box below'
    );
    if (input && input.toLowerCase() === "delete") {
      axios
        .request({
          method: "POST",
          url: "https://api.racoucoules.com/rememento/delete-account",
          data: {
            password: this.state.password,
          },
          headers: {
            Authorization: this.props.token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            cookie.remove('token');
            this.setState({
              ...this.state,
              passwordError: false,
              accountDeleted: true,
            });
          }
        })
        .catch((err) => {
          console.error(err);
          if (err.response.status === 401) {
            this.setState({ ...this.setState, passwordError: true });
          }
        });
    } else if (input && input.toLowerCase() !== "delete") {
      alert("Input unrecognized.");
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
        {this.state.accountDeleted && <Redirect to="/" />}
        <Typography variant="h6">Close Account</Typography>
        <Typography
          variant="subtitle2"
          style={{ color: "#ccc", margin: "0 25px" }}
        >
          To close your account, enter your password below.
        </Typography>
        <div style={textFieldContainerStyles}>
          <TextField
            fullWidth
            type="password"
            size="small"
            error={this.state.passwordError}
            helperText={this.state.passwordError && "Invalid password"}
            value={this.state.password}
            onChange={(e) =>
              this.setState({ ...this.state, password: e.target.value })
            }
            label="Password"
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

export default CloseAccount;
