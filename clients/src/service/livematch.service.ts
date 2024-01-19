import axios from "axios";
import {
  getMatchesFailure,
  getMatchesStart,
  getMatchesSuccess,
} from "../redux/slices/apimatches";

export const getLiveSportsData = async (dispatch: any) => {
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

  dispatch(getMatchesStart());

  try {
    const response = await axios.request(options);
    dispatch(getMatchesSuccess(response.data.DATA));
  } catch (error) {
    dispatch(getMatchesFailure());
    console.error(error);
  }
};
