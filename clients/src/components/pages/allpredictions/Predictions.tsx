import React, { useEffect, useState } from "react";
import { getAllPredictions } from "../../../service/prediction.service";
import { ToastContainer, toast } from "react-toastify";
import { format } from "date-fns";
import AllPredictionsMade from "./AllPredictionsMade";
import { NavLink, useNavigate } from "react-router-dom";

const Predictions = () => {
  const [predictions, setPredictions]: any = useState([]);

  const navigate = useNavigate();

  const handleNavigate = (id: any) => {
    navigate(`/predictions/${id}`);
  };

  // current date
  const currentDate = new Date();

  // filter and sort predictions based on today's date
  const sortedPredictions = predictions
    .filter((prediction: any) => {
      const matchDate = new Date(prediction.match.matchDate);
      return matchDate.toDateString() === currentDate.toDateString();
    })
    .sort((a: any, b: any) => b.pointesEarned - a.pointesEarned);

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
              <div key={prediction._id} className="col-md-6 mb-3 ">
                <NavLink
                  to={`/predictions/edit/${prediction._id}`}
                  className="text-decoration-none text-dark"
                  style={{ position: "absolute", top: "10px", right: "25px" }}
                >
                  Edit prediction
                </NavLink>
                <NavLink
                  to={`/users/${prediction?.user?._id}`}
                  className="text-decoration-none text-dark"
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
                        WIN
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
                            color:
                              prediction.pointesEarned > 0 ? "green" : "red",
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
              </div>
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
