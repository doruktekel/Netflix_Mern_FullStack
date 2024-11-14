import axios from "axios";
import { envVars } from "../config/envVars.js";

export const fetchDataFromTmdb = async (url) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${envVars.SERVICE_API_KEY.trim()} `,
    },
  };

  const res = await axios.get(url, options);

  if (res.status !== 200) {
    throw new Error("Fetching data problem", res.statusText);
  }

  return res.data;
};
