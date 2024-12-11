import React, { useEffect } from "react";
import Login from "./pages/Login";
import AppRouter from "./AppRouter";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/store";
import { login } from "./store/slices/authSlice";
import { fetchFromBackend } from "./services/httpFetch";
import "./App.css";

//function Router
const App: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchUserData = async () => {
      try {
        const access_token = localStorage.getItem("access_token");
        // fetch user data
        if (access_token) {
          const response = await fetchFromBackend(
            "/api/auth/validateToken",
            "GET",
            null,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            },
            signal
          );

          dispatch(login({ ...response, access_token }));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();

    return () => {
      controller.abort();
    };
  }, []);
  return (
    <div>
      {!isAuthenticated && <Login />}
      {isAuthenticated && (
        <Box
          sx={{
            minHeight: "100vh",
            background: "#fafafa",
          }}
        >
          <AppRouter />
        </Box>
      )}
    </div>
  );
};

export default App;
