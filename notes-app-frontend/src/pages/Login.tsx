import React, { useState } from "react";
import { Box, Container, CssBaseline, Tab, Tabs, Link } from "@mui/material";
import { indigo } from "@mui/material/colors";
import LoginForm from "../components/login/LoginForm";
import RegisterForm from "../components/login/RegisterForm";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const showLogin = () => {
    setIsLogin(true);
  };

  const showRegister = () => {
    setIsLogin(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      bgcolor={indigo[500]}
    >
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            mb: -3,
            zIndex: 1,
            position: "relative",
            bgcolor: "white",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            px: 2,
            pt: 1,
          }}
        >
          <Tabs
            value={isLogin ? 0 : 1}
            onChange={(_, newValue) => setIsLogin(newValue === 0)}
            aria-label="login or register tabs"
            sx={{
              "& .MuiTabs-flexContainer": {
                justifyContent: "center",
              },
              "& .MuiTab-root": {
                color: "primary.main",
                "&.Mui-selected": {
                  color: "primary.dark",
                  fontWeight: "bold",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "primary.main",
              },
            }}
          >
            <Tab label="Ingresar" />
            <Tab label="Registrarse" />
          </Tabs>
        </Box>

        {isLogin && <LoginForm onShowRegister={showRegister} />}
        {!isLogin && <RegisterForm onShowLogin={showLogin} />}
      </Container>
    </Box>
  );
};

export default Login;
