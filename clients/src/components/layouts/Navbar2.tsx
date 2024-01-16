import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SportsIcon from "@mui/icons-material/Sports";
import { NavLink } from "react-router-dom";

export default function NavAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }} className="mb-3">
      <AppBar position="static">
        <Toolbar>
          <NavLink
            style={{
              color: "white",
            }}
            to={"/"}
          >
            <SportsIcon fontSize="large" />
          </NavLink>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{
              fontSize: "1.2rem",
              cursor: "pointer",
              fontFamily: "Roboto",
            }}
          >
            <NavLink
              style={{
                color: "white",
                textDecoration: "none",
              }}
              to="/"
            >
              AFCONADE
            </NavLink>
          </Typography>
          <NavLink
            to="/"
            className="text-decoration-none mx-1 "
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "1rem",
            }}
          >
            Matches
          </NavLink>
          <NavLink
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "1rem",
            }}
            className=" text-decoration-none   "
            to="/leaderboard"
          >
            Leaderboard
          </NavLink>
          <NavLink
            className="text-decoration-none mx-1 "
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "1rem",
            }}
            to="/matches/predictions"
          >
            Predictions
          </NavLink>
          {/* 
          <NavLink
            className="text-decoration-none "
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "0.9rem",
            }}
            to="/admin"
          >
            Admin
          </NavLink>
          */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
