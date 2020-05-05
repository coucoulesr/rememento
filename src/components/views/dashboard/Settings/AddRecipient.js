import React from "react";
import APIURL from '../../../../config.js';

class AddRecipient extends React.Component {
  addRecipient = (e) => {
    e.preventDefault();
    const recipient = {
      name: this.state.name,
      phone: this.state.phone,
      id: this.props.recipients.length,
    };
    axios
      .request({
        url: APIURL,
        method: "POST",
        data: recipient,
        headers: {
          Authorization: this.props.token,
        },
      })
      .then(() => {
        this.props.toggleSettings();
      });
  };

  render() {
      return null;
  }
}

export default AddRecipient;
