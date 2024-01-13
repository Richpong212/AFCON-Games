import React, { useEffect, useState } from "react";
import { getAllMatches } from "../../../service/match.service";
import { NavLink } from "react-router-dom";
import { format } from "date-fns";

const Matches = ({ btntext }: any) => {
  const [matches, setMatches]: any = useState([]);

  // current date
  const currentDate = new Date();

  // filter matches by date
  const filteredMatches = matches.filter((match: any) => {
    const matchDate = new Date(match.matchDate);
    const matches = matchDate.toDateString() === currentDate.toDateString();
    return matches;
  });

  useEffect(() => {
    getAllMatches().then((res) => {
      setMatches(res.data);
    });
  }, []);

  return (
    <section>
      <h2 className="text-xl font-bold"> Today's Match Day</h2>
      <div className="row">
        {filteredMatches.length > 0 &&
          filteredMatches.map((match: any) => (
            <div className="col-md-6 mb-3" key={match._id}>
              <div className="bg-white p-4 rounded shadow">
                <p className="text-gray-600">
                  {match.homeTeam} vs {match.awayTeam}
                </p>
                <div>
                  <p>
                    Date:
                    {format(new Date(match.matchDate), "d MMMM yyyy")}
                  </p>
                  <p>Venue: {match.matchVenue}</p>
                </div>
                <NavLink to={`/matches/prediction/${match._id}`}>
                  <button className="mt-4 btn btn-primary">
                    {btntext ? btntext : "Predict"}
                  </button>
                </NavLink>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Matches;
