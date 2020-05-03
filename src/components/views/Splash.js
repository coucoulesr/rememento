import React from "react";
import { Link } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import validate from "validate.js";
import "./styles/Splash.css";

const signupStages = {
  HOME: "home",
  RECIPIENT: "recipient",
  PASSWORD: "password",
  CONFIRM: "confirm",
};

class Splash extends React.Component {
  state = {
    error: undefined,
    exampleQuote: undefined,
    signupStage: signupStages.HOME,
    name: "",
    email: "",
    password: "",
    nameError: false,
    emailError: false,
    recipientNameError: false,
    phoneError: false,
    passwordError: false,
    recipients: [
      {
        id: 0,
        name: "",
        phone: "",
        authorized: false,
      },
    ],
  };

  componentDidMount() {
    axios
      .get("https://api.racoucoules.com/rememento")
      .then((res) => {
        this.setState({
          ...this.state,
          exampleQuote: res.data,
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          error: err,
        });
      });

    this.setState({
      ...this.state,
      signupStage: this.props.register
        ? signupStages.RECIPIENT
        : signupStages.HOME,
    });
  }

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
        .get(
          `https://api.racoucoules.com/rememento/verify/${this.state.recipients[0].phone}`
        )
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
          newState.error = err;
        })
        .finally(() => {
          if (
            !newState.nameError &&
            !newState.emailError &&
            !newState.recipientNameError &&
            !newState.phoneError
          ) {
            this.setState({
              ...this.state,
              ...newState,
              signupStage: signupStages.PASSWORD,
            });
          } else this.setState({ ...this.state, ...newState });
        });
    }
    this.setState({ ...this.state, ...newState });
  };

  submit = () => {
    if (this.state.password.length < 7) {
      this.setState({ ...this.state, passwordError: true });
    } else {
      axios
        .post("https://api.racoucoules.com/rememento/register", {
          email: this.state.email,
          password: this.state.password,
          name: this.state.name,
          recipients: this.state.recipients,
        })
        .then((res) => {
          console.log(res);
          this.setState({
            ...this.state,
            passwordError: false,
            signupStage: signupStages.CONFIRM,
          });
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            ...this.state,
            error: err,
          });
        });
    }
  };

  render() {
    return (
      <div style={homeStyles}>
        {this.state.error && (
          <div style={bodyStyles}>
            <h1>{`${this.state.error}`}</h1>
            <Button
              style={buttonStyles}
              onClick={() => window.location.reload()}
              variant="outlined"
            >
              Restart
            </Button>
          </div>
        )}
        {[signupStages.HOME, signupStages.CONFIRM].includes(
          this.state.signupStage
        ) &&
          !this.state.error && (
            <div style={navStyles}>
              <span style={logoStyles}>
                <Link style={linkStyles} to="/">
                  rememento
                </Link>
              </span>
              <span className="splash-nav-link" style={navLinkStyles}>
                <Link style={linkStyles} to="/login">
                  Sign In
                </Link>
              </span>
            </div>
          )}
        {this.state.signupStage === signupStages.HOME && !this.state.error && (
          <div style={bodyStyles}>
            <p style={pStyles}>
              Rememento is an app that reminds your loved ones how much you
              care. We let you send automatic daily text reminders to let them
              know you're thinking of them.
            </p>
            <p style={quoteStyles}>"{this.state.exampleQuote}"</p>
            <div style={buttonContainerStyles}>
              <Button
                variant="raised"
                style={buttonStyles}
                onClick={() =>
                  this.setState({
                    ...this.state,
                    signupStage: signupStages.RECIPIENT,
                  })
                }
                variant="outlined"
              >
                Say "I Love You"
              </Button>
            </div>
          </div>
        )}
        {this.state.signupStage === signupStages.RECIPIENT &&
          !this.state.error && (
            <div style={bodyStyles}>
              <h1 style={formStyles[0]}>Who are you?</h1>
              <span style={textFieldContainerStyles}>
                <TextField
                  fullWidth
                  error={this.state.nameError}
                  helperText={this.state.nameError && "Please enter your name"}
                  value={this.state.name}
                  onChange={(e) =>
                    this.setState({ ...this.state, name: e.target.value })
                  }
                  style={formStyles[1]}
                  label="My name is..."
                  variant="filled"
                />
              </span>
              <h1 style={formStyles[2]}>Where can we email you?</h1>
              <span style={textFieldContainerStyles}>
                <TextField
                  fullWidth
                  error={this.state.emailError}
                  helperText={this.state.emailError && "Invalid email address"}
                  value={this.state.email}
                  onChange={(e) =>
                    this.setState({ ...this.state, email: e.target.value })
                  }
                  style={formStyles[3]}
                  label="My email address is..."
                  variant="filled"
                />
              </span>
              <h1 style={formStyles[4]}>Who do you love?</h1>
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
                  style={formStyles[5]}
                  label="I love..."
                  variant="filled"
                />
              </span>
              <h1 style={formStyles[6]}>Where can we text them?</h1>
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
                  style={formStyles[7]}
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
                <Button
                  style={buttonStylesFadeIn}
                  onClick={() =>
                    this.setState({
                      ...this.state,
                      signupStage: signupStages.HOME,
                    })
                  }
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        {this.state.signupStage === signupStages.PASSWORD && !this.state.error && (
          <div style={bodyStyles}>
            <h1 style={formStyles[0]}>Enter a password</h1>
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
                style={{ ...formStyles[1], margin: "20px 0 10px 0" }}
                label="My password will be..."
                variant="filled"
              />
            </span>
            <div style={buttonContainerStyles}>
              <Button
                style={{
                  ...buttonStylesFadeIn,
                  animationDelay: `${animationDelay * 3}s`,
                }}
                onClick={() => this.submit()}
              >
                Continue
              </Button>
              <Button
                style={{
                  ...buttonStylesFadeIn,
                  animationDelay: `${animationDelay * 3}s`,
                }}
                onClick={() =>
                  this.setState({
                    ...this.state,
                    signupStage: signupStages.HOME,
                  })
                }
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
        {this.state.signupStage === signupStages.CONFIRM && !this.state.error && (
          <div style={bodyStyles}>
            <h1 style={formStyles[0]}>
              Thanks for registering. Please check your email for registration
              confirmation so we can finish setting up your account.
            </h1>
          </div>
        )}
      </div>
    );
  }
}

const animationDelay = 0.125;

const homeStyles = {
  height: "100%",
  width: "100%",
  backgroundColor: "rgb(255,214,161)",
  background:
    "linear-gradient(328deg, rgba(255,214,161,1) 0%, rgba(255,166,155,1) 35%, rgba(246,143,255,1) 100%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "auto",
};

const navStyles = {
  width: "100%",
  height: "5%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const linkStyles = {
  padding: "15px 20px",
  color: "#3f3f3f",
};

const logoStyles = {
  fontSize: "1.5rem",
  fontWeight: "300",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const navLinkStyles = {
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const bodyStyles = {
  width: "80%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const pStyles = {
  fontSize: "1.25rem",
  width: "80%",
  margin: "0",
  padding: "7.5px 0",
};

const quoteStyles = {
  ...pStyles,
  fontSize: "1rem",
  color: "rgba(100,80,80,0.8)",
};

const buttonContainerStyles = {
  minWidth: "200px",
  width: "30%",
  display: "flex",
  justifyContent: "space-around",
  margin: "10px 0",
};

const buttonStyles = {
  margin: "20px 0",
};

const h1Styles = {
  margin: "30px 0 10px 0",
  fontWeight: "400",
  animationName: "fade-in-from-bottom",
  animationDuration: "1.5s",
  animationFillMode: "backwards",
  animationTimingFunction: "ease-out",
};

const textFieldContainerStyles = {
  width: "70%",
  maxWidth: "700px",
};

const textFieldStyles = {
  animationName: "fade-in-from-bottom",
  animationDuration: "1.5s",
  animationFillMode: "backwards",
  animationTimingFunction: "ease-out",
};

const buttonStylesFadeIn = {
  ...buttonStyles,
  ...textFieldStyles,
  animationDelay: `${animationDelay * 8}s`,
};

const formStyles = [];
for (let i = 0; i < 8; i++) {
  if (i % 2 === 0) {
    formStyles.push({ ...h1Styles, animationDelay: animationDelay * i + "s" });
  } else {
    formStyles.push({
      ...textFieldStyles,
      animationDelay: animationDelay * i + "s",
    });
  }
}

export default Splash;
