import React from "react";
import axios from "axios";
import {Button} from '@material-ui/core'
import {
  bodyStyles,
  pStyles,
  quoteStyles,
  buttonContainerStyles,
  buttonStyles,
} from "./styles/splash-styles";
import APIURL from "../../../config";

class SplashHome extends React.Component {
  state = {
    exampleQuote: ""
  };

  componentDidMount() {
    axios
      .get(APIURL)
      .then((res) => {
        this.setState({
          ...this.state,
          exampleQuote: res.data,
        });
      })
      .catch((err) => {
        this.props.setError(err);
      });
  }

  render() {
    return (
      <div style={bodyStyles}>
        <p style={pStyles}>
          Rememento is an app that reminds your loved ones how much you care. We
          let you send automatic daily text reminders to let them know you're
          thinking of them.
        </p>
        <p style={quoteStyles}>"{this.state.exampleQuote}"</p>
        <div style={buttonContainerStyles}>
          <Button
            variant="raised"
            style={buttonStyles}
            onClick={this.props.continue}
            variant="outlined"
          >
            Say "I Love You"
          </Button>
        </div>
      </div>
    );
  }
}

export default SplashHome;
