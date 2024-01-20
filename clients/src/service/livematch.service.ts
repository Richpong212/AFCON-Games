import axios from "axios";
import {
  getMatchesFailure,
  getMatchesStart,
  getMatchesSuccess,
} from "../redux/slices/apimatches";

export const getLiveSportsData = async (dispatch: any) => {
  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/fixtures/events",
    params: { fixture: "215662" },
    headers: {
      "X-RapidAPI-Key": "ca81cd05cemshbbf564bda0e4774p10030cjsn2745482b181d",
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    dispatch(getMatchesStart());

    dispatch(getMatchesSuccess(response.data));
  } catch (error) {
    dispatch(getMatchesFailure());

    console.error(error);
  }
};
