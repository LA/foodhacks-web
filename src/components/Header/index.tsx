import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { Toolbar } from "@material-ui/core";

const Header = React.memo(function Header() {
  return (
    <AppBar position={"static"}>
      <Toolbar>
        <Typography>FoodHacks 2019</Typography>
      </Toolbar>
    </AppBar>
  );
});

export default Header;
