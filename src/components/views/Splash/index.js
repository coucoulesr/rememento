import React from "react";
import { connect } from "react-redux";
import { setToken } from "../../../redux/actions";
import SplashNav from "./SplashNav";
import SplashHome from "./SplashHome";
import SignupRecipient from "./SignupRecipient";
import SignupPassword from "./SignupPassword";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import axios from "axios";
import cookie from "react-cookies";
import { homeStyles, bodyStyles, buttonStyles } from "./styles/splash-styles";
import APIURL from "../../../config";

const signupStages = {
  HOME: "home",
  RECIPIENT: "recipient",
  PASSWORD: "password",
  CONFIRM: "confirm",
};

class Splash extends React.Component {
  state = {
    error: undefined,
    signupStage: signupStages.HOME,
    name: "",
    email: "",
    password: "",
    recipients: [
      {
        id: 0,
        name: "",
        phone: "",
      },
    ],
  };

  submit = () => {
    const scrubbedPhone = Number(
      [...this.state.recipients[0].phone].filter((ch) => !isNaN(ch)).join("")
    );
    this.setState(
      {
        ...this.state,
        recipients: [
          {
            id: 0,
            phone: scrubbedPhone,
            name: this.state.recipients[0].name,
            authorized: false,
          },
        ],
      },
      () => {
        axios
          .post(APIURL + "/register", {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            recipients: this.state.recipients,
          })
          .then((res) => {
            console.log(res.data)
            cookie.save("token", res.data.token, {
              path: "/",
              maxAge: 3600000,
            });
            this.props.dispatch(setToken(res.data.token));
            this.setState({ ...this.state, signupStage: signupStages.CONFIRM });
          })
          .catch((err) => {
            this.setState({
              ...this.state,
              error: err,
            });
          });
      }
    );
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
          !this.state.error && <SplashNav />}
        {this.state.signupStage === signupStages.HOME && !this.state.error && (
          <SplashHome
            setError={(err) => this.setState({ ...this.state, error: err })}
            continue={() =>
              this.setState({
                ...this.state,
                signupStage: signupStages.RECIPIENT,
              })
            }
          />
        )}
        {this.state.signupStage === signupStages.RECIPIENT &&
          !this.state.error && (
            <SignupRecipient
              setError={(err) => this.setState({ ...this.state, error: err })}
              continue={(user) =>
                this.setState({
                  ...this.state,
                  name: user.name,
                  email: user.email,
                  recipients: user.recipients,
                  signupStage: signupStages.PASSWORD,
                })
              }
              cancel={() =>
                this.setState({
                  ...this.state,
                  signupStage: signupStages.HOME,
                })
              }
            />
          )}
        {this.state.signupStage === signupStages.PASSWORD && !this.state.error && (
          <SignupPassword
            setError={(err) => this.setState({ ...this.state, error: err })}
            continue={(password) => {
              console.log(password);
              this.setState({ ...this.state, password }, () => this.submit());
            }}
            cancel={() =>
              this.setState({
                ...this.state,
                signupStage: signupStages.HOME,
              })
            }
          />
        )}
        {this.state.signupStage === signupStages.CONFIRM && !this.state.error && (
          <Redirect to="/login" />
          // <div style={bodyStyles}>
          //   <h1 style={formStyles(0)}>
          //     Thanks for registering. Please check your email for registration
          //     confirmation so we can finish setting up your account.
          //   </h1>
          // </div>
        )}
      </div>
    );
  }
}

export default connect()(Splash);
