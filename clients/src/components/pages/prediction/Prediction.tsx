import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleMatch } from "../../../service/match.service";
import { createPrediction } from "../../../service/prediction.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Prediction = () => {
  const [match, setMatch]: any = useState(null);
  const [predictionData, setPredictionData] = useState({
    homeTeam: "",
    awayTeam: "",
    homeScore: "",
    awayScore: "",
    user: "",
  });

  // handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPredictionData({
      ...predictionData,
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
      setPredictionData({
        ...predictionData,
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
    const res = await createPrediction(
      predictionData,
      toast,
      matchid as string
    );

    // if the prediction was successfully created
    if (res.message === "Match created successfully") {
      setPredictionData({
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
      <h2 className="text-2xl font-bold text-dark">Make a Prediction</h2>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label className="form-label text-dark" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                name="user"
                value={predictionData.user}
                onChange={handleInputChange}
              />
            </div>
            {/* Match details */}
            <div className="mb-4 d-flex align-items-center">
              {/* Home team */}
              <div>
                {match && (
                  <button className="btn btn-primary disabled">
                    {match?.homeTeam}
                  </button>
                )}
                <input
                  type="number"
                  className="form-control w-1/4"
                  id="homeTeam"
                  placeholder="Enter your prediction"
                  name="homeScore"
                  value={predictionData.homeScore}
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
                  <button className="btn btn-primary disabled">
                    {match?.awayTeam}
                  </button>
                )}
                <input
                  type="number"
                  className="form-control w-1/4"
                  id="awayTeam"
                  placeholder="Enter your prediction"
                  name="awayScore"
                  value={predictionData.awayScore}
                  onChange={handleInputChange}
                  min={0}
                />
              </div>
            </div>
            {/* Submit button */}
            <button type="submit" className="btn btn-primary">
              Submit Prediction
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Prediction;
