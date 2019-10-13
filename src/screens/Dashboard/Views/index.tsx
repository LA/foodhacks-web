import React, { useState } from "react";
import Header from "../../../components/Header";
import styles from "./styles";
import { Typography } from "@material-ui/core";
import FeedList from "../../../components/Lists/FeedList";
import Modal from "react-modal";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { ACTIONS } from "../../../redux/actionTypes";
import axios from "axios";
import { API_URL } from "../../../config";

type Props = {
  accountType: string;
  dispatch: any;
  items: Array<any>;
};

const DashboardView = React.memo(function DashboardView(props: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("login");
  const [quantity, setQuantity] = useState('0');
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const onLogout = () => {
    props.dispatch({ type: ACTIONS.CORE.FINISH, payload: undefined });
    props.dispatch({ type: ACTIONS.UPDATE_ACCOUNT_TYPE, payload: undefined });
    localStorage.removeItem("token");
    setAccountType("");
  };

  const onLogin = () => {
    setModalMode("login");
    setError("");
    setModalOpen(true);
  };

  const onRegister = () => {
    setModalMode("register");
    setError("");
    setModalOpen(true);
  };

  const onAbout = () => {};

  const onAddDonation = () => {
    setModalMode("donate");
    setModalOpen(true);
    setError("");
  };

  const onConfirmClick = async () => {
    try {
      if (modalMode === "login") {
        const response = await axios.post(API_URL + "/users/login", {
          email,
          password
        });
        const { accountType, token, error } = response.data;
        if (error) {
          return setError(typeof error === "string" ? error : "Unknown error");
        }
        await localStorage.setItem("token", token);
        props.dispatch({ type: ACTIONS.CORE.FINISH, payload: token });
        props.dispatch({
          type: ACTIONS.UPDATE_ACCOUNT_TYPE,
          payload: accountType
        });
        setModalOpen(false);
      } else if (modalMode === "register") {
        const response: any = await axios.post(API_URL + "/users/register", {
          email,
          password,
          accountType
        });
        const { token, error } = response.data;
        if (error) {
          return setError(typeof error === "string" ? error : "Unknown error");
        }
        await localStorage.setItem("token", token);
        props.dispatch({ type: ACTIONS.CORE.FINISH, payload: token });
        props.dispatch({
          type: ACTIONS.UPDATE_ACCOUNT_TYPE,
          payload: accountType
        });
        setModalOpen(false);
      } else if (modalMode === "donate") {
        const token = await localStorage.getItem("token");
        const response: any = await axios.post(
          API_URL + "/donations/create",
          { quantity: parseInt(quantity, 10), name, location },
          {
            headers: {
              Authorization: "Bearer " + token
            }
          }
        );
        props.dispatch({ type: ACTIONS.FETCH_DONATIONS });
      }
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Unknown Error');
    }
  };

  return (
    <div>
      <Header
        accountType={props.accountType}
        onLogin={onLogin}
        onRegister={onRegister}
        onAbout={onAbout}
        onLogout={onLogout}
        onAddDonation={onAddDonation}
      />
      <div style={styles.container}>
        <Typography variant="h5" style={{ textAlign: "center" }}>
          Recent Donations
        </Typography>
        <FeedList items={props.items} />
      </div>
      <Modal isOpen={isModalOpen} style={styles.modal}>
        <Typography variant="h5" style={{ textAlign: "center" }}>
          {modalMode === "login"
            ? "Login"
            : modalMode === "register"
            ? "Register"
            : modalMode === "donate"
            ? "Donate"
            : "Login"}
        </Typography>
        {modalMode === 'register' || modalMode === 'login' ?
          <React.Fragment>
            <TextField
              id="outlined-name"
              label="Email"
              value={email}
              onChange={(event: any) => setEmail(event.target.value)}
              margin="normal"
              variant="outlined"
              style={{ width: "100%" }}
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
              value={password}
              onChange={(event: any) => setPassword(event.target.value)}
              style={{ width: "100%" }}
            />
            {modalMode === "register" && (
              <TextField
                id="outlined-select-currency"
                select
                label="Organization Type"
                value={accountType}
                onChange={(event: any) => setAccountType(event.target.value)}
                margin="normal"
                variant="outlined"
                style={{ width: "100%" }}
              >
                <MenuItem value={"business"}>Business</MenuItem>
                <MenuItem value={"charity"}>Charity</MenuItem>
                ))}
              </TextField>
            )}
          </React.Fragment> :
          <React.Fragment>
            <TextField
              id="outlined-name"
              label="Name"
              value={name}
              onChange={(event: any) => setName(event.target.value)}
              margin="normal"
              variant="outlined"
              style={{ width: "100%" }}
            />
            <TextField
              id="outlined-password-input"
              label="Quantity"
              margin="normal"
              variant="outlined"
              value={quantity}
              onChange={(event: any) => setQuantity(event.target.value)}
              style={{ width: "100%" }}
            />
            <TextField
              id="outlined-password-input"
              label="Location"
              margin="normal"
              variant="outlined"
              placeholder="University of Washington"
              value={location}
              onChange={(event: any) => setLocation(event.target.value)}
              style={{ width: "100%" }}
            />
          </React.Fragment>
        }

        <Typography
          variant="body1"
          style={{ textAlign: "center", color: "red", opacity: error ? 1 : 0 }}
        >
          {error}
        </Typography>
        <Button
          onClick={onConfirmClick}
          variant="contained"
          color="primary"
          style={{ width: "100%", marginTop: 30 }}
          size="large"
        >
          Confirm
        </Button>
        <Button
          onClick={() => setModalOpen(false)}
          variant="contained"
          color="primary"
          style={{ width: "100%", marginTop: 15 }}
          size="large"
        >
          Cancel
        </Button>
      </Modal>
    </div>
  );
});

export default DashboardView;
