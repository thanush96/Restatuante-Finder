import React from "react";
import classes from "./Emailsubmit.module.css";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const onLoginPress = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      alert("login success");
      window.location.reload();
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error);
    });
};

const emailsubmit = (props) => {
  return (
    <div className={classes.email_submit_container}>
      <div
        style={{
          fontWeight: "bold",
          padding: "5px 35px",
          cursor: "pointer",
          backgroundColor: "#4c8bf5",
          borderRadius: 5,
          color: "white",
        }}
        onClick={onLoginPress}
      >
        Google Login
      </div>
    </div>
  );
};
export default emailsubmit;
