import React from "react";
import { TextField, Button } from "@material-ui/core";
import {
  bodyStyles,
  formStyles,
  textFieldContainerStyles,
  buttonContainerStyles,
  buttonStylesFadeIn,
  animationDelay,
} from "./styles/splash-styles";

class SignupPassword extends React.Component {
  state = {
    password: "",
    passwordError: false,
  };

  submit = (e) => {
    e.preventDefault();
    if (this.state.password.length < 7) {
      this.setState({ ...this.state, passwordError: true });
    } else {
      this.props.continue(this.state.password);
    }
  };

  reset = (e) => {
    e.preventDefault();
    this.props.cancel();
  };

  render() {
    return (
      <form
        onSubmit={(e) => this.submit(e)}
        onReset={(e) => this.reset(e)}
        style={bodyStyles}
      >
        <h1 style={formStyles(0)}>Enter a password</h1>
        <span style={textFieldContainerStyles}>
          <TextField
            fullWidth
            error={this.state.passwordError}
            helperText={
              this.state.passwordError &&
              "Please enter a password 8 characters or longer"
            }
            type="password"
            value={this.state.password}
            onChange={(e) =>
              this.setState({ ...this.state, password: e.target.value })
            }
            style={{ ...formStyles(1), margin: "20px 0 10px 0" }}
            label="My password will be..."
            variant="filled"
          />
        </span>
        <div style={buttonContainerStyles}>
          <Button
            type="submit"
            style={{
              ...buttonStylesFadeIn,
              animationDelay: `${animationDelay * 3}s`,
            }}
          >
            Continue
          </Button>
          <Button
            type="reset"
            style={{
              ...buttonStylesFadeIn,
              animationDelay: `${animationDelay * 3}s`,
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    );
  }
}

export default SignupPassword;
