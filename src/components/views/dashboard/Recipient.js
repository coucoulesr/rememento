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
import APIURL from "../../../config";

class Recipient extends React.Component {
  state = {
    editingRecipient: false,
    newName: this.props.recipient.name,
    newPhone: this.props.recipient.phone,
    phoneError: false,
  };

  editRecipient = (e) => {
    if (e) e.preventDefault();
    const newPhone = Number(
      [...String(this.state.newPhone)].filter((ch) => !isNaN(ch)).join("")
    );
    axios
      .get(`${APIURL}/verify/${newPhone}`)
      .then((res) => {
        if (res.data.valid) {
          this.setState({ ...this.state, phoneError: false });
          let newRecipient = {
            id: this.props.recipient.id,
            name: this.state.newName,
            phone: newPhone,
          };
          axios
            .request({
              url: `${APIURL}/${this.props.recipient.id}`,
              method: "PUT",
              data: newRecipient,
              headers: {
                Authorization: this.props.token,
              },
            })
            .then((res) => {
              newRecipient = {
                id: res.data.id,
                name: res.data.name,
                phone: res.data.phone,
              };
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
            <div style={{ padding: "5px" }}>
              <Typography variant="h4">{this.props.recipient.name}</Typography>
            </div>
            <div
              style={{
                position: "relative",
                right: "-20px", // -1/2 * (buttonWidth + buttonMargin)
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
              }}
            >
              <Typography variant="h5">{this.props.recipient.phone}</Typography>
              <IconButton
                style={{
                  marginLeft: "10px",
                  height: "30px",
                  width: "30px",
                }}
                onClick={() =>
                  this.setState({ ...this.state, editingRecipient: true })
                }
              >
                <EditIcon fontSize="small" style={{ color: "#ccc" }} />
              </IconButton>
            </div>
          </div>
        )}
        {this.state.editingRecipient && (
          <form
            onSubmit={(e) => this.editRecipient(e)}
            onReset={() =>
              this.setState({
                ...this.state,
                newName: this.props.recipient.name,
                newPhone: this.props.recipient.phone,
                editingRecipient: false,
              })
            }
            style={containerStyles}
          >
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
              <IconButton type="submit">
                <CheckCircleIcon style={{ color: "green" }} />
              </IconButton>
              <IconButton type="reset">
                <CancelIcon style={{ color: "red" }} />
              </IconButton>
            </div>
          </form>
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
