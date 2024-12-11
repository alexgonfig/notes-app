import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import FormIcon from "./FormIcon";
import { fetchFromBackend } from "../../services/httpFetch";

type RegisterData = {
  username: string;
  password: string;
  email: string;
  repeatPassword: string;
};

type RegisterFormProps = {
  onShowLogin: () => void;
};

const RegisterForm: React.FC<RegisterFormProps> = (
  props: RegisterFormProps
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<RegisterData>({
    username: "",
    password: "",
    email: "",
    repeatPassword: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);

      // validate password inputs
      if (formData.password !== formData.repeatPassword) {
        throw new Error("Las contraseñas no coinciden");
      }

      // API call
      const response = await fetchFromBackend<RegisterData>(
        "/api/auth/register",
        "POST",
        formData
      );

      console.log(response);
      setIsLoading(false);
      alert("Registro exitoso!, Ahora puedes ingresar!");
      setFormData({
        username: "",
        password: "",
        email: "",
        repeatPassword: "",
      });

      props.onShowLogin();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      alert(error);
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
            Registrarse
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
              type="text"
              id="name"
              label="Nombre de usuario"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              variant="standard"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="email"
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={formData.email}
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="repeatPassword"
              label="Repetir Contraseña"
              type="password"
              id="repeatPassword"
              value={formData.repeatPassword}
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
              {isLoading ? "Cargando..." : "Registrarse"}
            </Button>
          </Box>
          <p>
            ¿Ya tienes una cuenta de usuario?{" "}
            <Button
              type="button"
              variant="text"
              onClick={() => {
                props.onShowLogin();
              }}
            >
              Ingresa acá
            </Button>
          </p>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
