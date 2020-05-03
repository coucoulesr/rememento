import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { Link, Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { login } from "../../redux/actions";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <a color="inherit" href="https://www.racoucoules.com/">
        Richard Coucoules
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

class Login extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    token: "",
    recipients: [],
    error: "",
    success: false,
  };

  pushToDashboard = () => {
    this.props.dispatch(
      login(
        this.state.email,
        this.state.name,
        this.state.recipients,
        this.state.token
      )
    );
    this.setState({ ...this.state, success: true });
  };

  submit = (e) => {
    e.preventDefault();
    axios
      .post("https://api.racoucoules.com/rememento/login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        this.setState({
          ...this.state,
          name: res.data.name,
          token: res.data.token,
          recipients: res.data.recipients,
        });
        cookie.save('token', res.data.token, { path: '/', maxAge: 3600000 })
        this.pushToDashboard();
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          this.setState({
            ...this.state,
            error: "Invalid username or password.",
          });
        } else {
          this.setState({ ...this.state, error: error.message });
        }
      });
  };

  render() {
    return (
      <Container component="main" maxWidth="xs">
        {this.state.success && <Redirect to="/dashboard" />}
        {this.state.error && <div style={errorStyles}>{this.state.error}</div>}
        <CssBaseline />
        <div style={paperStyles}>
          <Avatar style={avatarStyles}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form styles={formStyles} onSubmit={(e) => this.submit(e)} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={this.state.email}
              onChange={(e) =>
                this.setState({ ...this.state, email: e.target.value })
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={(e) =>
                this.setState({ ...this.state, password: e.target.value })
              }
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              onClick={(e) => this.submit(e)}
              variant="contained"
              color="primary"
              style={submitStyles}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/" variant="body2">
                  Return Home
                </Link>
              </Grid>
              <Grid item xs>
                <Link to="/" variant="body2">
                  Sign up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

const paperStyles = {
  marginTop: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const avatarStyles = {
  margin: "20px",
  backgroundColor: '#B58548',
};

const formStyles = {
  width: "100%", // Fix IE 11 issue.
  marginTop: "15px",
};

const submitStyles = {
  margin: "10px 0",
};

const errorStyles = {
  margin: "20px",
  padding: "10px 25px",
  backgroundColor: "#ffcccc",
  borderBottom: "2px solid red",
};

export default connect()(Login);
