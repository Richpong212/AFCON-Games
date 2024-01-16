import React from "react";
import Matches from "../matches/Matches";
import axios from "axios";

const getSportsData = async () => {
  const options = {
    method: "GET",
    url: "https://livescore-sports.p.rapidapi.com/v1/events/live",
    params: {
      locale: "EN",
      timezone: "0",
      sport: "soccer",
    },
    headers: {
      "X-RapidAPI-Key": "b91d5df0famshfe3e8272cf33f91p19de9fjsn87a217fb0df4",
      "X-RapidAPI-Host": "livescore-sports.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

getSportsData();

const Homepage = () => {
  return (
    <section className="w-full max-w-3xl p-4 space-y-6">
      <Matches />
    </section>
  );
};

export default Homepage;
