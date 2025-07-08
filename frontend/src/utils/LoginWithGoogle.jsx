import React from "react";
import { auth, provider } from "../utils/Firebase";
import { signInWithPopup } from "firebase/auth";

function LoginWithGoogle() {
  const googleLogin = async () => {
    try {
      const respone = await signInWithPopup(auth, provider);

      const user = respone.user;

      const userData = {
        fullName: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };
      const apiRespone = await fetch(
        "http://localhost:5000/api/auth/loginWithgoogle",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(userData),
        }
      );
      //   if (!apiRespone.ok) {
      //     throw new Error("Failed to Login");
      //   }
      const responeData = await apiRespone.json();
      console.log(responeData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button onClick={googleLogin}>Sign In with Google</button>
    </>
  );
}

export default LoginWithGoogle;
