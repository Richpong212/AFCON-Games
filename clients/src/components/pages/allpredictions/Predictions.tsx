import React, { useEffect, useState } from "react";
import { getAllPredictions } from "../../../service/prediction.service";
import { ToastContainer, toast } from "react-toastify";
import { format } from "date-fns";
import AllPredictionsMade from "./AllPredictionsMade";
import { NavLink } from "react-router-dom";

const Predictions = () => {
  const [predictions, setPredictions]: any = useState([]);
  const [filteredPredictions, setFilteredPredictions] = useState([]);

  // get the current date
  const currentDate = format(new Date(), "yyyy-MM-dd");

  // fetch the predictions from the database
  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const res: any = await getAllPredictions(toast);
        setPredictions(res.data);
      } catch (error) {
        console.error("Error fetching predictions:", error);
      }
    };
    fetchPredictions();
  }, []);

  // filter predictions when predictions state is updated
  useEffect(() => {
    const filtered = predictions.filter(
      (prediction: any) =>
        format(new Date(prediction.createdAt), "yyyy-MM-dd") === currentDate
    );
    const sorted = filtered.sort(
      (a: any, b: any) => b.pointesEarned - a.pointesEarned
    );
    setFilteredPredictions(sorted);
  }, [predictions, currentDate]);

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
        <button onClick={handleToday} className="btn btn-primary mt-4">
          today's
        </button>
        <button onClick={handleAll} className="btn btn-primary mt-4 mx-3">
          all predictions
        </button>
      </div>

      {today && (
        <div className="row">
          {filteredPredictions.length > 0 &&
            filteredPredictions.map((prediction: any) => (
              <NavLink
                to={`/users/${prediction?.user?._id}`}
                key={prediction._id}
                className="col-md-6 mb-3 text-decoration-none text-dark"
              >
                {/* Your prediction card JSX */}
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
