import React, { useEffect } from "react";
import Swal from "sweetalert2";
import Login from "./pages/Login";
import AppRouter from "./AppRouter";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/store";
import { login, logout } from "./store/slices/authSlice";
import { fetchFromBackend } from "./services/httpFetch";
import { useLocation } from "react-router-dom";
import "./App.css";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const location = useLocation();

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
            signal,
            dispatch
          );

          dispatch(login({ ...response, access_token }));
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          text:
            error instanceof Error
              ? error.message
              : String(error) ||
                "Se produjo un error inesperado. Inténtalo de nuevo.",
          icon: "error",
          confirmButtonText: "Aceptar",
        })
      }
    };

    fetchUserData();

    return () => {
      controller.abort();
    };
  }, [dispatch]);

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
