import React, { useState } from "react";
import "./App.css";
import { Box } from "@mui/material";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";

function App() {
  const [isSkeleton, setIsSkeleton] = useState(false);

  const handleLoginGoogle = async (credentialResponse) => {
    setIsSkeleton(true);
    try {
      const data = {
        token: credentialResponse.credential,
      };

      console.log("SEC", data);
      const res = await axios.post(
        "http://localhost:3333/device/user/google-auth",
        data
      );
      console.log("first", res);

      setIsSkeleton(false);
    } catch (error) {
      setIsSkeleton(false);
    }
  };



  return (
    <>
      <div className="App">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleLoginGoogle(credentialResponse);
            }}
            useOneTap
            size="large"
            width="215px"
            containerProps={{
              style: {
                border: "none",
                width: "100% !important",
              },
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </Box>
      </div>
    </>
  )
}

export default App