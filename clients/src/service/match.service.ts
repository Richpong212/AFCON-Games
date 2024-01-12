import axios from "axios";

//interface for match
interface IMatch {
  homeTeam: string;
  awayTeam: string;
  matchDate: string;
  matchTime: string;
  matchVenue: string;
}

const baseUrl = process.env.REACT_APP_API;

// create a match
export const createMatch = async (match: IMatch, toast: any) => {
  try {
    const res = await axios.post(`${baseUrl}/matches`, match);

    toast("Match created successfully", {
      type: "success",
    });
    return res.data;
  } catch (error: any) {
    toast(error.response.data.message, {
      type: "error",
    });
    return error;
  }
};

// get all matches
export const getAllMatches = async () => {
  try {
    const res = await axios.get(`${baseUrl}/matches`);
    return res.data;
  } catch (error) {
    return error;
  }
};

// get a single match
export const getSingleMatch = async (id: string) => {
  try {
    const res = await axios.get(`${baseUrl}/matches/${id}`);
    return res.data.data;
  } catch (error) {
    return error;
  }
};
