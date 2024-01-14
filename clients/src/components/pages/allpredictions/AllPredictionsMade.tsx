import React, { useEffect, useState } from "react";
import { getAllPredictions } from "../../../service/prediction.service";
import { ToastContainer, toast } from "react-toastify";

const AllPredictionsMade = () => {
  const [predictions, setPredictions]: any = useState([]);

  // fetch the predictions from the database
  useEffect(() => {
    const fetchPredictions = async () => {
      const res: any = await getAllPredictions(toast);
      setPredictions(res.data);
    };
    fetchPredictions();
  }, []);

  return (
    <section className="container">
      <ToastContainer />

      <div className="row">
        {predictions.length > 0 &&
          predictions.map((prediction: any) => (
            <div key={prediction._id} className="col-md-6 mb-3">
              <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-bold">@{prediction?.user?.name}</h2>
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
            </div>
          ))}
      </div>
    </section>
  );
};

export default AllPredictionsMade;
