import React from 'react';
import {
    Avatar,
  } from "@mui/material";
  import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const FormIcon:React.FC = ()=>{
    return(<Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
    <LockOutlinedIcon />
  </Avatar>)
}

export default FormIcon;