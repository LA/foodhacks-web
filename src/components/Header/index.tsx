import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1
    }
  })
);

type Props = {
  accountType: string;
  token?: string;
  onLogin(): void;
  onRegister(): void;
  onAbout(): void;
  onLogout(): void;
  onAddDonation(): void;
};

const Header = React.memo(function Header(props: Props) {
  const classes = useStyles();
  return (
    <AppBar position={"static"}>
      <Toolbar>
        <Typography className={classes.title}>FoodHacks 2019</Typography>
        {props.accountType === 'business' && (
          <React.Fragment>
            <Button onClick={props.onAddDonation} color="inherit">
              Donate
            </Button>
          </React.Fragment>
        )}
        {props.token ? (
          <React.Fragment>
            <Button onClick={props.onLogout} color="inherit">
              Logout
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button onClick={props.onLogin} color="inherit">
              Login
            </Button>
            <Button onClick={props.onRegister} color="inherit">
              Register
            </Button>
          </React.Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
});

const mapStateToProps = (state: any) => {
  return {
    token: state.token
  };
};
export default connect(mapStateToProps)(Header);
