import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPredictionById } from "../../../service/prediction.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updatePrediction } from "../../../service/prediction.service";

const EditPrediction = () => {
  const [match, setMatch]: any = useState(null);
  const [predictionData, setPredictionData] = useState({
    homeScore: "",
    awayScore: "",
  });
  const [predictionTime, setPredictionTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString();
      setPredictionTime(currentTime);
    }, 1000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  // prediction time limit
  const predictionTimeLimit = "18:00:00";

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
      const matchFromServer = await getPredictionById(matchid as string);
      setMatch(matchFromServer);

      // set the home and away team in the state
      setPredictionData({
        ...predictionData,
      });
    };

    getMatch();
  }, []);

  // handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // send the prediction data to the api
    const res = await updatePrediction(
      predictionData,
      toast,
      matchid as string
    );

    // if the prediction was successfully created
    if (res.message === "Prediction updated successfully") {
      setPredictionData({
        homeScore: "",
        awayScore: "",
      });
    }
  };

  return (
    <section className="max-w-3xl p-4 space-y-4 mx-auto">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-dark">Edit Prediction</h2>

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
                name="user"
                placeholder={match?.data?.user.name}
                disabled
              />
            </div>
            {/* Match details */}
            <div className="mb-4 d-flex align-items-center">
              {/* Home team */}
              <div>
                {match && (
                  <span className="btn btn-primary disabled">
                    {match?.data?.homeTeam}
                  </span>
                )}
                <input
                  type="number"
                  className="form-control w-1/4 mt-2"
                  id="homeTeam"
                  placeholder="0"
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
                  <span className="btn btn-primary disabled">
                    {match?.data.awayTeam}
                  </span>
                )}
                <input
                  type="number"
                  className="form-control w-1/4 mt-2"
                  id="awayTeam"
                  placeholder="3"
                  name="awayScore"
                  value={predictionData.awayScore}
                  onChange={handleInputChange}
                  min={0}
                />
              </div>
            </div>
            <p>Current Time: {predictionTime}</p>
            {/* Submit button */}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={predictionTime >= predictionTimeLimit}
            >
              Update Prediction
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditPrediction;
