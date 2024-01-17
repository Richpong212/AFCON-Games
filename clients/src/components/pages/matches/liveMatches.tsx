import React, { useEffect, useState } from "react";
import { getLiveSportsData } from "../../../service/livematch.service";

const LiveMatches = () => {
  const [liveMatches, setLiveMatches]: any = useState(null);

  // filter the matches to get CAF African CUP
  const cafMacthes = liveMatches?.filter((match: any) => {
    return match.COMPETITION_DESCRIPTION === "CAF";
  });

  // find the match time
  const matchTime = cafMacthes?.map((match: any) => {
    const matchStatus = match?.EVENTS?.map((event: any) => {
      const matchStatus = event?.MATCH_STATUS;

      return matchStatus;
    });
    return matchStatus;
  });

  // find the home team of the first game
  const homeTeamName = cafMacthes?.map((match: any) => {
    // map through all the mactehs
    const homeTeam = match?.EVENTS?.map((event: any) => {
      const homeTeam = event?.HOME_TEAM[0].NAME;
      return homeTeam;
    });
    return homeTeam;
  });

  // find the homeTeam Badge of the first game
  const homeTeamBadge = cafMacthes?.map((match: any) => {
    // map through all the mactehs
    const homeTeam = match?.EVENTS?.map((event: any) => {
      const homeTeam = event?.HOME_TEAM[0].BADGE_SOURCE;

      return homeTeam;
    });
    return homeTeam;
  });

  // find the homeTeam Badge of the first game
  const awayTeamBadge = cafMacthes?.map((match: any) => {
    // map through all the mactehs
    const awayTeam = match?.EVENTS?.map((event: any) => {
      const awayTeam = event?.AWAY_TEAM[0].BADGE_SOURCE;

      return awayTeam;
    });
    return awayTeam;
  });

  // find the home team of the first game
  const awayTeamName = cafMacthes?.map((match: any) => {
    // map through all the mactehs
    const homeTeam = match?.EVENTS.map((event: any) => {
      const homeTeam = event?.AWAY_TEAM[0].NAME;

      return homeTeam;
    });
    return homeTeam;
  });

  // find the home team score of the first game

  const homeTeamScore = cafMacthes?.map((match: any) => {
    // map through all the mactehs
    const homeTeam = match.EVENTS.map((event: any) => {
      const homeTeam = event?.HOME_SCORE;

      return homeTeam;
    });
    return homeTeam;
  });

  // find the away team score of the first game
  const awayTeamScore = cafMacthes?.map((match: any) => {
    // map through all the mactehs
    const homeTeam = match.EVENTS.map((event: any) => {
      const homeTeam = event?.AWAY_SCORE;

      return homeTeam;
    });
    return homeTeam;
  });

  // get score to update the database
  const scores = {
    homeScore: homeTeamScore?.toString(),
    awayScore: awayTeamScore?.toString(),
    awayTeamName: awayTeamName?.toString(),
    homeTeamName: homeTeamName?.toString(),
    matchTime: matchTime?.toString(),
  };

  console.log(scores);

  // get the live matches
  useEffect(() => {
    const getLiveMatches = async () => {
      const res = await getLiveSportsData();
      setLiveMatches(res);
    };
    getLiveMatches();

    // update the database
    const updateScore = async () => {};
  }, []);

  return (
    <main className="container mt-5">
      <header className="d-flex justify-content-center align-items-center mb-4">
        <h1 className="text-2xl font-bold">Live Score</h1>
      </header>
      <section className="w-100">
        <h2 className="text-xl font-semibold">Current Match</h2>
        <div className="w-100 mt-4 d-flex justify-content-between bg-light p-4 rounded-md">
          <div className="d-flex flex-column align-items-center">
            <p className="font-medium text-lg">{homeTeamName}</p>
            <img
              alt="Team A logo"
              className="w-24 h-24 mt-2"
              height="100"
              src={homeTeamBadge}
              style={{
                aspectRatio: "100/100",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="d-flex flex-column align-items-center">
            <p className="font-medium text-4xl">
              {homeTeamScore} - {awayTeamScore}
            </p>
            <p className="text-sm text-gray-500">{matchTime}</p>
          </div>
          <div className="d-flex flex-column align-items-center">
            <p className="font-medium text-lg">{awayTeamName}</p>
            <img
              alt="Team B logo"
              className="w-24 h-24 mt-2"
              height="100"
              src={awayTeamBadge}
              style={{
                aspectRatio: "100/100",
                objectFit: "cover",
              }}
              width="100"
            />
          </div>
        </div>
      </section>

      {/*
      <section className="w-100 mt-5">
        <h2 className="text-xl font-semibold">Match Events</h2>
        <table className="table table-striped table-bordered table-hover mt-4">
          <thead>
            <tr>
              <th>Time</th>
              <th>Event</th>
              <th>Player</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>45'</td>
              <td>Goal</td>
              <td>Player 1 (Team B)</td>
            </tr>
            <tr>
              <td>30'</td>
              <td>Yellow Card</td>
              <td>Player 2 (Team A)</td>
            </tr>
            <tr>
              <td>15'</td>
              <td>Goal</td>
              <td>Player 3 (Team B)</td>
            </tr>
            <tr>
              <td>10'</td>
              <td>Goal</td>
              <td>Player 4 (Team A)</td>
            </tr>
          </tbody>
        </table>
      </section>
      */}
    </main>
  );
};

export default LiveMatches;
