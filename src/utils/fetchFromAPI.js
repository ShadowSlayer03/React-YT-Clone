import axios from "axios";

const options = {
  url: `${import.meta.env.VITE_YT_API_BASE_URL}`,
  headers: {
    "X-RapidAPI-Key": `${import.meta.env.VITE_RAPID_API_KEY}`,
    "X-RapidAPI-Host": `${import.meta.env.VITE_RAPID_API_HOST}`,
  },
};

export const fetchFromAPI = async (url) => {
  const {data} = await axios.get(
    `${import.meta.env.VITE_YT_API_BASE_URL}/${url}`,
    options
  );

  return data;
};
