import React, { useEffect, useState } from "react";
import { getAllPredictions } from "../../../service/prediction.service";
import { ToastContainer, toast } from "react-toastify";
import { format } from "date-fns";
import AllPredictionsMade from "./AllPredictionsMade";
import { NavLink } from "react-router-dom";

const Predictions = () => {
  const [predictions, setPredictions]: any = useState([]);

  // get the current date
  const currentDate = format(new Date(), "yyyy-MM-dd");
  // filtered predictions
  const filteredPredictions = predictions.filter(
    (prediction: any) =>
      format(new Date(prediction.createdAt), "yyyy-MM-dd") === currentDate
  );

  // find the all the predictions with the one with the highest points earned on top
  const sortedPredictions = filteredPredictions.sort(
    (a: any, b: any) => b.pointesEarned - a.pointesEarned
  );

  // fetch the predictions from the database
  useEffect(() => {
    const fetchPredictions = async () => {
      const res: any = await getAllPredictions(toast);
      setPredictions(res.data);
    };
    fetchPredictions();
  }, []);

  const [today, setToday] = useState(true);
  const [all, setAll] = useState(false);

  const handleToday = () => {
    setToday(true);
    setAll(false);
  };

  const handleAll = () => {
    setToday(false);
    setAll(true);
  };

  return (
    <section className="container">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-3">Predictions</h1>
      <div className="mb-3">
        <button onClick={handleToday} className="btn btn-primary mt-4 ">
          today's
        </button>
        <button onClick={handleAll} className="btn btn-primary mt-4 mx-3">
          all predictions
        </button>
      </div>

      {today && (
        <div className="row">
          {sortedPredictions.length > 0 &&
            sortedPredictions.map((prediction: any) => (
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
                  <h2 className="text-xl font-bold">
                    @{prediction?.user?.name}
                  </h2>
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
      )}
      {all && (
        <>
          <AllPredictionsMade />
        </>
      )}
    </section>
  );
};

export default Predictions;
