import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import Swal from "sweetalert2";
import FormIcon from "./FormIcon";
import { fetchFromBackend } from "../../services/httpFetch";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";

export type LoginFormData = {
  username_or_email: string;
  password: string;
};

export type LoginData = {
  username?: string;
  email?: string;
  password: string;
};

type LoginFormProps = {
  onShowRegister: () => void;
};

const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginFormData>({
    username_or_email: "",
    password: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const isEmail = (input: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);

      let loginData: LoginData = { password: formData.password };

      // check if input is username or email
      if (isEmail(formData.username_or_email)) {
        loginData.email = formData.username_or_email;
      } else {
        loginData.username = formData.username_or_email;
      }

      // API call
      const response = await fetchFromBackend<LoginData>(
        "/api/auth/login",
        "POST",
        loginData
      );

      dispatch(login({ ...response }));
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      Swal.fire({
        title: "Error!",
        text:
          error instanceof Error
            ? error.message
            : String(error) ||
              "Se produjo un error inesperado. Inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: "0 3px 5px 2px rgba(0,0,0, .3)",
        padding: 3,
        paddingTop: 4,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FormIcon />
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Ingresar
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%", px: 2 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nombre de usuario o Email"
              name="username_or_email"
              autoComplete="username_or_email"
              autoFocus
              value={formData.username_or_email}
              onChange={handleChange}
              variant="standard"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              variant="standard"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              {isLoading ? "Cargando..." : "Ingresar"}
            </Button>
          </Box>
          <p>
            ¿No tienes una cuenta de usuario?{" "}
            <Button
              type="button"
              variant="text"
              onClick={() => {
                props.onShowRegister();
              }}
            >
              Registrate acá
            </Button>
          </p>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
