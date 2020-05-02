import React from "react";
import Recipient from "./Recipient";
import cardStyles from "./styles/card-styles";

class RecipientList extends React.Component {
  changeRecipients = (r) => {
    const recipients = this.props.recipients
    this.props.changeRecipients(
      recipients.map((recipient) => {
        if (recipient.id == r.id) {
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
