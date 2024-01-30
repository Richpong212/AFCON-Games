import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../components/pages/home/Homepage";
import Leaderboard from "../components/pages/leaderboard/Leaderboard";
import Admin from "../components/pages/admin/Admin";
import Prediction from "../components/pages/prediction/Prediction";
import Predictions from "../components/pages/allpredictions/Predictions";
import Navbar from "../components/layouts/navbar/Navbar";
import Standings from "../components/pages/standings/Standings";
import UpdateMatch from "../components/pages/matchResults/UpdateMatch";
import SingleUser from "../components/pages/singleUser/SingleUser";
import EditPredictions from "../components/pages/allpredictions/EditPredictions";
import GameRules from "../components/pages/gameRules/GameRules";
import Gamegroups from "../components/pages/createGameGroups/Gamegroups";

const IndexRoute = () => {
  return (
    <BrowserRouter>
      <nav>
        <Navbar />
      </nav>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/create-group" element={<Gamegroups />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/matches/prediction/:matchid" element={<Prediction />} />
        <Route path="/matches/update/:matchid" element={<UpdateMatch />} />
        <Route path="/users/:id" element={<SingleUser />} />
        <Route path="/matches/predictions" element={<Predictions />} />
        <Route path="/game-rules" element={<GameRules />} />
        <Route
          path="/predictions/edit/:matchid"
          element={<EditPredictions />}
        />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default IndexRoute;
