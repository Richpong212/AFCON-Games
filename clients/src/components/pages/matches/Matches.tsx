import React, { useEffect, useState } from "react";
import { getAllMatches } from "../../../service/match.service";
import { NavLink } from "react-router-dom";
import { format, set } from "date-fns";

const Matches = () => {
  const [matches, setMatches]: any = useState([]);
  const [filteredMatches, setFilteredMatches]: any = useState([]);

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // date
    const interval = setInterval(() => {
      const currentDate = new Date();
      const formattedDate = format(new Date(currentDate), "yyyy-MM-dd");
      setCurrentDate(formattedDate);
    }, 1000);

    const fetchedMatches = async () => {
      const res = await getAllMatches();

      if (res) {
        // filter matches
        const matchesFiltered = res.data.filter((match: any) =>
          match.matchDate.includes(currentDate)
        );

        setFilteredMatches(matchesFiltered);
      }

      if (res) {
        setMatches(res.data);
      }
    };
    fetchedMatches();

    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      <div className="row">
        {filteredMatches.length > 0 &&
          filteredMatches.map((match: any) => (
            <div className="col-md-6 mb-3" key={match._id}>
              <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-bold">Match Day</h2>
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
