import axios from "axios";

export const getLiveSportsData = async () => {
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

    return response.data.DATA;
  } catch (error) {
    console.error(error);
  }
};
