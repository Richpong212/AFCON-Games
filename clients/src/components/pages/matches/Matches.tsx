import React, { useEffect, useState } from "react";
import { getAllMatches } from "../../../service/match.service";
import { NavLink } from "react-router-dom";
import { format } from "date-fns";
import AllMatches from "./AllMatches";

const Matches = ({ btntext }: any) => {
  const [matches, setMatches]: any = useState([]);

  const [todayMatches, setTodayMatches] = useState(true);
  const [allMatches, setAllMatches] = useState(false);

  // handle today matches
  const handleTodayMatches = () => {
    setTodayMatches(true);
    setAllMatches(false);
  };

  // handle all matches
  const handleAllMatches = () => {
    setTodayMatches(false);
    setAllMatches(true);
  };

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
      <NavLink onClick={handleTodayMatches} to={""}>
        <span className="text-xl font-bold"> Matches</span>
      </NavLink>
      {/*
        <NavLink className="mx-2" to={""} onClick={handleAllMatches}>
        <span className="text-xl font-bold"> Previous Matches</span>
      </NavLink>
         */}

      {todayMatches && (
        <>
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
        </>
      )}

      {allMatches && <AllMatches matches={matches} />}
    </section>
  );
};

export default Matches;
