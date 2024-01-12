import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <header className="py-4 px-3 bg-white shadow-sm">
        <div className="d-flex justify-content-between align-items-center">
          <NavLink className="text-decoration-none" to="/">
            <h1
              style={{
                fontFamily: "cursive",
                fontSize: "2rem",
              }}
              className="text-1xl font-bold text-dark"
            >
              AFCON
            </h1>
          </NavLink>

          <nav>
            <ul className="d-flex gap-4 list-unstyled mb-0">
              <li>
                <NavLink className="text-dark text-decoration-none" to="/">
                  Matches
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="text-dark text-decoration-none mx-4"
                  to="/leaderboard"
                >
                  Leaderboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="text-dark text-decoration-none mx-4"
                  to="/matches/predictions"
                >
                  Predictions
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="text-dark text-decoration-none mx-2"
                  to="/admin"
                >
                  Admin
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      ;
    </div>
  );
};

export default Navbar;
