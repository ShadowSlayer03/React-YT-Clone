import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Videos } from "../components";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const {searchTerm} = useParams();

  useEffect(() => {
    let vids = [];
    fetchFromAPI(`search/?query=${searchTerm}`)
      .then((data) => {
        vids.push(...data?.videos);
        return fetchFromAPI(
          `search/continuation?continuation_token=${data?.continuation_token}&query=${searchTerm}`
        );
      })
      .then((newData) => {
        vids.push(...newData?.videos);
        setVideos(vids);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchTerm]);

  return (
    <Box p={2} display="flex" flexDirection="column" sx={{ overflowY: "auto", height: "90vh" }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={2}
        sx={{ color: "white", paddingLeft: 1.5 }}
      >
        Search Results For: <span style={{ color: "#F31503" }}>{searchTerm}</span> videos
      </Typography>

      <Videos videos={videos} toRender={true} isSearch={true} />
    </Box>
  );
};

export default SearchFeed;
