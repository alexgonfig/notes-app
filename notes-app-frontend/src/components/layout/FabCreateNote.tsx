import React, { useState } from "react";
import { Fab } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import { Link } from "react-router-dom";

const FabCreateNote: React.FC = (props) => {
  return (
    <Link to="/createNote">
      <Fab color="primary" aria-label="add" {...props}>
        <AddIcon />
      </Fab>
    </Link>
  );
};

export default FabCreateNote;
