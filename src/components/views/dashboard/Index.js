import React from "react";
import Nav from "./Nav";
import RecipientList from "./RecipientList";
import Settings from "./Settings";
import { changeRecipients } from "../../../redux/actions";
import axios from "axios";
import { connect } from "react-redux";
import { login } from "../../../redux/actions";
import { CircularProgress } from "@material-ui/core";

function mapStateToProps(state) {
  return {
    email: state.email,
    name: state.name,
    recipients: state.recipients,
    token: state.token,
  };
}

class Dashboard extends React.Component {
  state = {
    viewSettings: false,
    readyToRender: false,
  };

  componentDidMount() {
    if (!this.props.email) {
      axios({
        method: "GET",
        url: "https://api.racoucoules.com/rememento/fetch-user",
        headers: { Authorization: this.props.token },
      }).then((res) => {
        this.props.dispatch(
          login(
            res.data.email,
            res.data.name,
            res.data.recipients,
            this.props.token
          )
        );
        this.setState({ ...this.state, readyToRender: true });
      });
    } else if (this.props.name && this.props.recipients) {
      this.setState({ ...this.state, readyToRender: true });
    }
  }

  toggleSettings = () => {
    this.setState({ ...this.state, viewSettings: !this.state.viewSettings });
  };

  render() {
    return (
      <div style={bodyStyles}>
        {!this.state.readyToRender && <CircularProgress />}
        {this.state.readyToRender && (
          <Nav
            name={this.state.readyToRender && this.props.name}
            toggleSettings={this.toggleSettings}
            viewSettings={this.state.viewSettings}
          />
        )}
        {!this.state.viewSettings && this.state.readyToRender && (
          <RecipientList
            changeRecipients={(r) => this.props.dispatch(changeRecipients(r))}
            token={this.props.token}
            recipients={this.props.recipients}
          />
        )}
        {this.state.viewSettings && this.state.readyToRender && (
          <Settings
            recipients={this.props.recipients}
            token={this.props.token}
            toggleSettings={this.toggleSettings}
          />
        )}
      </div>
    );
  }
}

const bodyStyles = {
  display: "flex",
  flexDirection: "column",
};

export default connect(mapStateToProps)(Dashboard);
