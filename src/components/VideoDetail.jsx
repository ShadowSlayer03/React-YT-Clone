import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useMediaQuery } from "@mui/material";

import { Videos, Loader } from ".";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  function formatNumberIndian(number) {
    if (number < 100000) {
      return number;
    }
    if (number < 10000000) {
      return (number / 100000).toFixed(2) + " lakh";
    }
    return (number / 10000000).toFixed(2) + " crore";
  }

  useEffect(() => {
    fetchFromAPI(`video/details?video_id=${id}`).then((data) => {
      setVideoDetail(data);
      fetchFromAPI(`video/recommendations?video_id=${id}`).then((data) =>
        setVideos(data.videos)
      );
    });
  }, [id]);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const typographyVariant = isSmallScreen ? "subtitle1" : "h6";

  if (!videoDetail) return <Loader />;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {videoDetail.title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff", overflowY: "scroll" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${videoDetail.channel_id}`}>
                <Typography
                  variant={typographyVariant}
                  color="#fff"
                >
                  {videoDetail.author}
                  <CheckCircleIcon
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {formatNumberIndian(videoDetail.number_of_views)} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  Published On: {videoDetail.published_time.split("T")[0]}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
