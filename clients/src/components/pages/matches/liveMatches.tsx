import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LiveMatches = () => {
  const [matches, setMatches] = useState([]);
  console.log(matches);

  // get live matches from store
  const liveMatches = useSelector((state: any) => state.matches.matches);

  useEffect(() => {
    setMatches(liveMatches[0].api?.fixtures);
  }, [liveMatches]);

  return (
    <section className="container">
      <div
        className="d-flex mt-3 mb-2 justify-content-between  align-items-center"
        style={{
          backgroundColor: "#fff",
          width: "100%",
          padding: "10px",
        }}
      >
        <div>
          <h6>Home Team</h6>
          <img src="" alt="" />
        </div>
        <div className="d-flex flex-column">
          <span className="mx-3">1 - 2</span>
          <span>Half Time</span>
        </div>
        <div>
          <h6>Away Team</h6>
          <img src="" alt="" />
        </div>
      </div>
    </section>
  );
};

export default LiveMatches;
