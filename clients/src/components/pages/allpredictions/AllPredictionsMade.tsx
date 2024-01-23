import React, { useEffect, useState } from "react";
import { getAllPredictions } from "../../../service/prediction.service";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const AllPredictionsMade = () => {
  const [predictions, setPredictions]: any = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const predictionsPerPage: number = 12;

  // Get current predictions based on the current page
  const indexOfLastPrediction: number = currentPage * predictionsPerPage;
  const indexOfFirstPrediction: number =
    indexOfLastPrediction - predictionsPerPage;
  const currentPredictions: any = predictions.slice(
    indexOfFirstPrediction,
    indexOfLastPrediction
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages: any = Math.ceil(predictions.length / predictionsPerPage);

  // Calculate page numbers to display
  const pageNumbers: number[] = [];
  const pageRangeDisplayed: number = 5; // Replace 10 with the desired value
  if (totalPages <= pageRangeDisplayed) {
    // If total pages are less than or equal to the page range, display all page numbers
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // If total pages are more than the page range, display a limited set of page numbers with ellipsis
    const halfPageRange: number = Math.floor(pageRangeDisplayed / 2);
    const startPage: number = Math.max(1, currentPage - halfPageRange);
    const endPage: number = Math.min(totalPages, currentPage + halfPageRange);

    // Display page numbers with ellipsis at the beginning
    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push(-1);
      }
    }

    // Display page numbers within the range
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Display page numbers with ellipsis at the end
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(-1);
      }
      pageNumbers.push(totalPages);
    }
  }

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
        {currentPredictions.length > 0 &&
          currentPredictions.map((prediction: any) => (
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

      {/* Pagination */}
      <nav className="d-flex justify-content-center mt-4">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              &lt;
            </button>
          </li>
          {pageNumbers.map((pageNumber: number, index: number) => (
            <li
              key={index}
              className={`page-item ${pageNumber === -1 ? "disabled" : ""} ${
                currentPage === pageNumber ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() =>
                  pageNumber !== -1 ? paginate(pageNumber) : null
                }
              >
                {pageNumber !== -1 ? pageNumber : "..."}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              &gt;
            </button>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default AllPredictionsMade;
