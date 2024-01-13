import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleMatch, updateMatch } from "../../../service/match.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateMatch = () => {
  const [match, setMatch]: any = useState(null);
  const [matchData, setMatchData]: any = useState({
    homeTeam: "",
    awayTeam: "",
    homeScore: "",
    awayScore: "",
  });

  // handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMatchData({
      ...matchData,
      [e.target.name]: e.target.value,
    });
  };

  // get the match id from the url
  const { matchid } = useParams();

  // get the match from the api
  useEffect(() => {
    const getMatch = async () => {
      const matchFromServer = await getSingleMatch(matchid as string);
      setMatch(matchFromServer);

      // set the home and away team in the state
      setMatchData({
        ...matchData,
        homeTeam: matchFromServer.homeTeam,
        awayTeam: matchFromServer.awayTeam,
      });
    };

    getMatch();
  }, [matchid]);

  // handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // send the prediction data to the api
    const res = await updateMatch(matchid as string, matchData, toast);

    // if the prediction was successfully created
    if (res.message === "Match created successfully") {
      setMatchData({
        user: "",
        homeTeam: "",
        awayTeam: "",
        homeScore: "",
        awayScore: "",
      });
    }
  };

  return (
    <section className="max-w-3xl p-4 space-y-4 mx-auto">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-dark">Updating Match Scores</h2>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Match details */}
            <div className="mb-4 d-flex align-items-center">
              {/* Home team */}
              <div>
                {match && (
                  <span className="btn btn-primary disabled">
                    {match?.homeTeam}
                  </span>
                )}
                <input
                  type="number"
                  className="form-control w-1/4"
                  id="homeTeam"
                  placeholder="Enter correct score"
                  name="homeScore"
                  value={matchData.homeScore}
                  onChange={handleInputChange}
                  min={0}
                />
              </div>
              {/* vs */}
              <div className="mx-4">
                <span className="text-dark">vs</span>
              </div>

              {/* Away team */}
              <div>
                {match && (
                  <span className="btn btn-primary disabled">
                    {match?.awayTeam}
                  </span>
                )}
                <input
                  type="number"
                  className="form-control w-1/4"
                  id="awayTeam"
                  placeholder="Enter correct score"
                  name="awayScore"
                  value={matchData.awayScore}
                  onChange={handleInputChange}
                  min={0}
                />
              </div>
            </div>
            {/* Submit button */}
            <button type="submit" className="btn btn-primary">
              Update Match
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateMatch;
