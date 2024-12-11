import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./pages/Dashboard";
import ViewNote from "./pages/ViewNote";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import NotFound from "./pages/NotFound";

const AppRouter: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/createNote" element={<CreateNote />} />
        <Route path="/editNote/:noteId" element={<EditNote />} />
        <Route path="/note/:noteId" element={<ViewNote />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRouter;
