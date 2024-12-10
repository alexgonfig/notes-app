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

type RegisterData = {
  name: string;
  password: string;
  email: string;
  repeatPassword: string;
};

const RegisterForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // TODO: Authenticate user with provided credentials
    console.log(
      `registering user name:${formData.name}, email: ${formData.email}, password: ${formData.password}`
    );
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
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
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              type="text"
              id="name"
              label="Nombre de usuario"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
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
        </Box>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
