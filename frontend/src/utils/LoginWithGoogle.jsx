import React from "react";
import { auth, provider } from "../utils/Firebase";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";

function LoginWithGoogle() {
  const dispatch = useDispatch();

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

      const responeData = await apiRespone.json();

      if (responeData.success) {
        // ✅ Dispatch Redux action here
        dispatch(loginSuccess(responeData.user)); // you'll define this action
      } else {
        console.log("Login failed:", responeData.message);
      }
    } catch (error) {
      console.log("Google login error:", error);
    }
  };

  return <button onClick={googleLogin}>Sign In with Google</button>;
}

export default LoginWithGoogle;
