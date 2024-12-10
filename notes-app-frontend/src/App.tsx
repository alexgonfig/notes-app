import React, { useState } from "react";
import Login from "./pages/Login";
import AppRouter from "./AppRouter";
import "./App.css";

//function Router
const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <div>      
      {isAuthenticated && <button onClick={logout}>Logout</button>}
      {!isAuthenticated && <button onClick={login}>Login</button>}
      {!isAuthenticated && <Login />}
      {isAuthenticated && <AppRouter />}
    </div>
  );
};

export default App;
