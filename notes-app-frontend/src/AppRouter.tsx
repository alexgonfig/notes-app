import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./pages/Dashboard";
import ViewNote from "./pages/ViewNote";
import CreateNote from "./pages/CreateNote";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/createNote" element={<CreateNote />} />
        <Route path="/editNote/:noteId" element={<h1>Update Note page</h1>} />
        <Route path="/note/:noteId" element={<ViewNote />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
