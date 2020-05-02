import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
  },
}));

export default function Nav(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loggedOut, setLoggedOut] = useState(false);
  const logout = () => {
    dispatch({ type: "LOG_OUT" });
    setTimeout(800, () => setLoggedOut(true));
  };

  return (
    <div className={classes.root}>
      {loggedOut && <Redirect to="/" />}
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "#7B4780" }}>
          <Typography variant="h6" className={classes.title}>
            {props.name}
          </Typography>
          <IconButton
            onClick={props.toggleSettings}
            className={classes.menuButton}
            style={{
              color: props.viewSettings
                ? "rgba(255,255,255,1)"
                : "rgba(255,255,255,0.5)",
            }}
            aria-label="settings"
          >
            <SettingsIcon />
          </IconButton>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
