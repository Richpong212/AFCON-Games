import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../components/pages/home/Homepage";
import Leaderboard from "../components/pages/leaderboard/Leaderboard";
import Admin from "../components/pages/admin/Admin";
import Prediction from "../components/pages/prediction/Prediction";
import Predictions from "../components/pages/allpredictions/Predictions";
import NavAppBar from "../components/layouts/Navbar2";

const IndexRoute = () => {
  return (
    <BrowserRouter>
      <nav>
        <NavAppBar />
      </nav>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/matches/prediction/:matchid" element={<Prediction />} />
        <Route path="/matches/predictions" element={<Predictions />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default IndexRoute;
