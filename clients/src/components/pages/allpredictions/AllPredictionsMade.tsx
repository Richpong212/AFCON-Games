import React, { useEffect, useState } from "react";
import { getAllPredictions } from "../../../service/prediction.service";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const AllPredictionsMade = () => {
  const [predictions, setPredictions]: any = useState([]);

  // current date
  const currentDate = new Date().toDateString();

  // fetch the predictions from the database
  useEffect(() => {
    const fetchPredictions = async () => {
      const res: any = await getAllPredictions(toast);
      setPredictions(res.data);
    };
    fetchPredictions();
  }, []);

  return (
    <section className="">
      <ToastContainer />

      <div className="row">
        {predictions.length > 0 &&
          predictions.map((prediction: any) => (
            <NavLink
              to={`/users/${prediction?.user?._id}`}
              key={prediction._id}
              className="col-md-6 mb-3 text-decoration-none text-dark"
            >
              <div className="bg-white p-4 rounded shadow">
                {prediction.pointesEarned === 3 && (
                  <span
                    style={{
                      position: "absolute",
                      right: "10%",
                      backgroundColor: "green",
                      fontSize: "12px",
                      fontWeight: "bold",
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Game Master
                  </span>
                )}
                <h2 className="text-xl font-bold">@{prediction?.user?.name}</h2>
                <p className="text-gray-600">
                  {currentDate !==
                    new Date(prediction?.match.matchDate).toDateString() && (
                    <span
                      style={{
                        color: "red",
                      }}
                      className="text-red-600"
                    >
                      Dead Match
                    </span>
                  )}
                </p>
                <p className="text-gray-600">Predicted </p>
                <div>
                  <div className="homeTeam d-flex  justify-content-between">
                    <div>{prediction.homeTeam}</div>
                    <div>{prediction.homeScore}</div>
                  </div>
                  <span>vs</span>
                  <div className="awayTeam d-flex  justify-content-between">
                    <div>{prediction.awayTeam}</div>
                    <div>{prediction.awayScore}</div>
                  </div>
                  <div className="awayTeam mt-3 d-flex  justify-content-between">
                    <div>Points Earned </div>
                    <div
                      style={{
                        color: prediction.pointesEarned > 0 ? "green" : "red",
                      }}
                    >
                      {prediction.pointesEarned
                        ? prediction.pointesEarned
                        : "--"}
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
      </div>
    </section>
  );
};

export default AllPredictionsMade;
