import axios from "axios";
import { getMatchesFailure } from "../redux/slices/apimatches";

const baseurl = process.env.REACT_APP_MATCH_LIVE_URL;
const rapid_api_key = process.env.REACT_APP_MATCH_HEADERKEY;
const rapid_api_host = process.env.REACT_APP_MATCH_LIVE_HOST;

export const getLiveSportsData = async (dispatch: any) => {
  const options = {
    method: "GET",
    url: `${baseurl}`,
    params: { fixture: "215662" },
    headers: {
      "X-RapidAPI-Key": `${rapid_api_key}`,
      "X-RapidAPI-Host": `${rapid_api_host}`,
    },
  };

  try {
    const response = await axios.request(options);

    // save the infomation to local storage
    const livescore: any = localStorage.setItem(
      "livescore",
      JSON.stringify(response.data)
    );

    return livescore;
  } catch (error) {
    dispatch(getMatchesFailure());
    console.error(error);
  }
};
