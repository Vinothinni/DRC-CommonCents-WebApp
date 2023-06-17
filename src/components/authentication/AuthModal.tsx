// import { makeStyles, Theme } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { Button, Tab, Tabs, AppBar, Box } from "@mui/material";
import Signup from "./Signup";
import Login from "./Login";
import { useState } from "react";
// import { useGlobalState } from "../../store/Context";
import { auth } from "../../firebase";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import globalStore from "../../store/AuthStore";
import { observer } from "mobx-react";

// const useStyles = makeStyles((theme: Theme) => ({
//   modal: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   paper: {
//     width: 400,
//     backgroundColor: theme.palette.background.paper,
//     color: "white",
//     borderRadius: 10,
//   },
//   google: {
//     padding: 24,
//     paddingTop: 0,
//     display: "flex",
//     flexDirection: "column",
//     textAlign: "center",
//     gap: 20,
//     fontSize: 20,
//   },
// }));

function AuthModal() {
//   const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { setAlert } = globalStore;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: "success",
        });

        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{
          width: 85,
          height: 40,
          marginLeft: 15,
          backgroundColor: "#EEBC1D",
        }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="auth-modal-modal"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="auth-modal-paper">
            <AppBar
              position="static"
              style={{
                backgroundColor: "transparent",
                color: "white",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{ borderRadius: 10 }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup handleClose={handleClose} />}
            <Box className="auth-modal-google">
              <span>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default observer(AuthModal);