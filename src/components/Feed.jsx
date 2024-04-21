import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Sidebar, Videos } from "../components";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    let vids = [];
    fetchFromAPI(`search/?query=${selectedCategory}`)
      .then((data) => {
        vids.push(...data?.videos);
        return fetchFromAPI(`search/continuation?continuation_token=${data?.continuation_token}&query=${selectedCategory}`);
      })
      .then((newData) => {
        vids.push(...newData?.videos);
        console.log("Final Vids", vids);
        setVideos(vids);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { xs: "column", md: "row" } }}>
      <Box
        sx={{
          height: { xs: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { xs: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright {new Date().getFullYear()} React YT Clone
        </Typography>
      </Box>

      <Box p={2} display="flex" flexDirection="column" sx={{ overflowY: "auto", height: "90vh" }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white", paddingLeft: 1.5 }}
        >
          {selectedCategory} <span style={{ color: "#F31503" }}>Videos</span>
        </Typography>

        <Videos videos={videos} toRender={true} />
      </Box>
    </Stack>
  );
};

export default Feed;
