import React from "react";
import axios from "axios";
import { TextField, Button } from "@material-ui/core";
import validate from "validate.js";
import {
  bodyStyles,
  formStyles,
  textFieldContainerStyles,
  buttonContainerStyles,
  buttonStylesFadeIn,
} from "./styles/splash-styles";
import APIURL from "../../../config";

class SignupRecipient extends React.Component {
  state = {
    nameError: false,
    emailError: false,
    recipientNameError: false,
    phoneError: false,
    name: "",
    email: "",
    recipients: [
      {
        id: 0,
        name: "",
        phone: "",
        authorized: false,
      },
    ],
  };

  validateNamePhoneEmail = () => {
    let newState = {};

    // Check if name is not empty
    newState.nameError = !this.state.name;

    // Check if valid email entered
    const emailConstraint = { email: { email: true } };
    newState.emailError =
      !this.state.email || !!validate(this.state, emailConstraint);

    // Check if recipient name is not empty
    newState.recipientNameError = !this.state.recipients[0].name;

    // Check if phone number is not empty
    if (!this.state.recipients[0].phone) {
      newState.phoneError = true;
    } else {
      // Check if valid phone number was entered
      axios
        .get(`${APIURL}/verify/${this.state.recipients[0].phone}`)
        .then((res) => {
          if (res.data.valid) {
            newState.phoneError = false;
          } else {
            // Validation error (could access API but phone number was invalid)
            newState.phoneError = true;
          }
        })
        .catch((err) => {
          // Network error (couldn't access API)
          this.props.setError(err);
        })
        .finally(() => {
          if (
            !newState.nameError &&
            !newState.emailError &&
            !newState.recipientNameError &&
            !newState.phoneError
          ) {
            this.props.continue({
              name: this.state.name,
              email: this.state.email,
              recipients: this.state.recipients,
            });
          } else this.setState({ ...this.state, ...newState });
        });
    }
    this.setState({ ...this.state, ...newState });
  };

  render() {
    return (
      <div style={bodyStyles}>
        <h1 style={formStyles(0)}>Who are you?</h1>
        <span style={textFieldContainerStyles}>
          <TextField
            fullWidth
            error={this.state.nameError}
            helperText={this.state.nameError && "Please enter your name"}
            value={this.state.name}
            onChange={(e) =>
              this.setState({ ...this.state, name: e.target.value })
            }
            style={formStyles(1)}
            label="My name is..."
            variant="filled"
          />
        </span>
        <h1 style={formStyles(2)}>Where can we email you?</h1>
        <span style={textFieldContainerStyles}>
          <TextField
            fullWidth
            error={this.state.emailError}
            helperText={this.state.emailError && "Invalid email address"}
            value={this.state.email}
            onChange={(e) =>
              this.setState({ ...this.state, email: e.target.value })
            }
            style={formStyles(3)}
            label="My email address is..."
            variant="filled"
          />
        </span>
        <h1 style={formStyles(4)}>Who do you love?</h1>
        <span style={textFieldContainerStyles}>
          <TextField
            fullWidth
            error={this.state.recipientNameError}
            helperText={
              this.state.recipientNameError &&
              "Please enter your recipient's name"
            }
            value={this.state.recipients[0].name}
            onChange={(e) =>
              this.setState({
                ...this.state,
                recipients: [
                  {
                    id: 0,
                    name: e.target.value,
                    phone: this.state.recipients[0].phone,
                    authorized: false,
                  },
                ],
              })
            }
            style={formStyles(5)}
            label="I love..."
            variant="filled"
          />
        </span>
        <h1 style={formStyles(6)}>Where can we text them?</h1>
        <span style={textFieldContainerStyles}>
          <TextField
            type="tel"
            error={this.state.phoneError}
            helperText={this.state.phoneError && "Invalid Phone Number"}
            fullWidth
            value={this.state.recipients[0].phone}
            onChange={(e) =>
              this.setState({
                ...this.state,
                recipients: [
                  {
                    id: 0,
                    name: this.state.recipients[0].name,
                    phone: e.target.value,
                    authorized: false,
                  },
                ],
              })
            }
            style={formStyles(7)}
            label="Their phone number is..."
            variant="filled"
          />
        </span>
        <div style={buttonContainerStyles}>
          <Button
            style={buttonStylesFadeIn}
            onClick={() => this.validateNamePhoneEmail()}
          >
            Continue
          </Button>
          <Button style={buttonStylesFadeIn} onClick={this.props.cancel}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}

export default SignupRecipient;
