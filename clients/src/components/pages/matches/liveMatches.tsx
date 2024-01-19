import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLiveSportsData } from "../../../service/livematch.service";

const LiveMatches = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getLiveSportsData(dispatch);
  }, [dispatch]);

  return <div></div>;
};

export default LiveMatches;
