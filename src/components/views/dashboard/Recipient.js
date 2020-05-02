import React from "react";
import { Typography, IconButton, TextField } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import {
  textFieldStyles,
  textFieldContainerStyles,
  formButtonsStyles,
} from "./styles/card-styles.js";
import axios from "axios";

class Recipient extends React.Component {
  state = {
    editingRecipient: false,
    newName: this.props.recipient.name,
    newPhone: this.props.recipient.phone,
    phoneError: false,
  };

  editRecipient = () => {
    axios
      .get(
        `https://api.racoucoules.com/rememento/verify/${this.state.newPhone}`
      )
      .then((res) => {
        if (res.data.valid) {
          this.setState({ ...this.state, phoneError: false });
          const newRecipient = {
            id: this.props.recipient.id,
            name: this.state.newName,
            phone: this.state.newPhone,
          };
          axios
            .request({
              url: `https://api.racoucoules.com/rememento/${this.props.recipient.id}`,
              method: "PUT",
              data: newRecipient,
              headers: {
                Authorization: this.props.token,
              },
            })
            .then((res) => {
              this.props.changeRecipients(newRecipient);
              this.setState({ ...this.state, editingRecipient: false });
            })
            .catch((err) => console.error(err));
        } else {
          this.setState({ ...this.state, phoneError: true });
        }
      })
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <div>
        {!this.state.editingRecipient && (
          <div style={containerStyles}>
            <div style={{ padding: "10px" }}>
              <Typography variant="h4">{this.props.recipient.name}</Typography>
            </div>
            <div style={{ padding: "10px" }}>
              <Typography variant="h5">{this.props.recipient.phone}</Typography>
            </div>
            <div
              style={{
                position: "relative",
                top: "-50px",
                marginBottom: "-50px",
                display: "block",
                alignSelf: "flex-end",
              }}
            >
              <IconButton
                onClick={() =>
                  this.setState({ ...this.state, editingRecipient: true })
                }
              >
                <EditIcon style={{ color: "#ccc" }} />
              </IconButton>
            </div>
          </div>
        )}
        {this.state.editingRecipient && (
          <div style={containerStyles}>
            <div style={textFieldContainerStyles}>
              <TextField
                fullWidth
                size="small"
                value={this.state.newName}
                onChange={(e) =>
                  this.setState({ ...this.state, newName: e.target.value })
                }
                label="Name"
                variant="filled"
                style={textFieldStyles}
              />
              <TextField
                fullWidth
                size="small"
                error={this.state.phoneError}
                helperText={this.state.phoneError && "Invalid phone number"}
                value={this.state.newPhone}
                onChange={(e) =>
                  this.setState({ ...this.state, newPhone: e.target.value })
                }
                label="Phone Number"
                variant="filled"
                style={textFieldStyles}
              />
            </div>
            <div style={formButtonsStyles}>
              <IconButton onClick={() => this.editRecipient()}>
                <CheckCircleIcon style={{ color: "green" }} />
              </IconButton>
              <IconButton
                onClick={() =>
                  this.setState({
                    ...this.state,
                    newName: this.props.recipient.name,
                    newPhone: this.props.recipient.phone,
                    editingRecipient: false,
                  })
                }
              >
                <CancelIcon style={{ color: "red" }} />
              </IconButton>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const containerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export default Recipient;
