import React, { useEffect, useState } from "react";
import { getAllMatches } from "../../../service/match.service";
import { NavLink } from "react-router-dom";

const Matches = () => {
  const [matches, setMatches]: any = useState([]);

  useEffect(() => {
    const fetchedMatches = async () => {
      const res = await getAllMatches();
      if (res) {
        setMatches(res.data);
      }
    };
    fetchedMatches();
  }, []);

  return (
    <section>
      <div className="row">
        {matches.length > 0 &&
          matches.map((match: any) => (
            <div className="col-md-6 mb-3" key={match._id}>
              <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-bold">Match Day</h2>
                <p className="text-gray-600">
                  {match.homeTeam} vs {match.awayTeam}
                </p>
                <div>
                  <p>Date: {match.matchDate}</p>
                  <p>Venue: {match.matchVenue}</p>
                </div>
                <NavLink to={`/matches/prediction/${match._id}`}>
                  <button className="mt-4 btn btn-primary">Predict</button>
                </NavLink>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Matches;
