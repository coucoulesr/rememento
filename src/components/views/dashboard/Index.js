import React from "react";
import Nav from "./Nav";
import RecipientList from "./RecipientList";
import Settings from "./Settings";
import { connect } from "react-redux";
import { changeRecipients } from "../../../redux/actions";

const mapStateToProps = (state) => ({
  name: state.name,
  email: state.email,
  token: state.token,
  recipients: state.recipients,
});

class Dashboard extends React.Component {
  state = {
    viewSettings: false,
  };

  toggleSettings = () => {
    this.setState({ ...this.state, viewSettings: !this.state.viewSettings });
  };

  render() {
    return (
      <div style={bodyStyles}>
        <Nav
          name={this.props.name}
          toggleSettings={this.toggleSettings}
          viewSettings={this.state.viewSettings}
        />
        {!this.state.viewSettings && (
          <RecipientList
            changeRecipients={(r) => this.props.dispatch(changeRecipients(r))}
            token={this.props.token}
            recipients={this.props.recipients}
          />
        )}
        {this.state.viewSettings && (
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
