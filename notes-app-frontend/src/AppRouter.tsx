import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home page</h1>} />
        <Route path="/create" element={<h1>Create Note page</h1>} />
        <Route path="/update/:noteId" element={<h1>Update Note page</h1>} />
        <Route path="/note/:noteId" element={<h1>View Note page</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
