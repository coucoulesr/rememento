import React from "react";
import Recipient from "./Recipient";
import cardStyles from "./styles/card-styles";
import { Typography } from "@material-ui/core";

class RecipientList extends React.Component {
  changeRecipients = (r) => {
    const recipients = this.props.recipients;
    this.props.changeRecipients(
      recipients.map((recipient) => {
        if (recipient.id === r.id) {
          return r;
        } else {
          return recipient;
        }
      })
    );
  };

  render() {
    return this.props.recipients.map((recipient) => {
      return (
        <div style={cardStyles}>
          <Typography style={{margin: 0, padding: '10px 0 0 15px', alignSelf: 'flex-start', color: '#bbb'}} variant="subtitle1">Recipient</Typography>
          <Recipient
            changeRecipients={this.changeRecipients}
            recipient={recipient}
            key={recipient.id}
            token={this.props.token}
          />
        </div>
      );
    });
  }
}

export default RecipientList;
