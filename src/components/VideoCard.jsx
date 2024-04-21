import React from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../utils/constants";

const VideoCard = ({ video }) => {
  //console.log("video inside videocard:", video);
  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "400px", md: "320px" },
        boxShadow: "none",
        borderRadius: 0,
      }}
    >
      <Link to={video.video_id ? `/video/${video.video_id}` : demoVideoUrl}>
        <CardMedia
          image={video?.thumbnails[video.thumbnails.length - 1]?.url}
          alt={video?.title}
          sx={{
            width: { xs: "100%", sm: "400px", md: "320px" },
            height: 180,
          }}
        />
      </Link>
      <CardContent sx={{ backgroundColor: "#1e1e1e", height: "106px" }}>
        <Link to={video.video_id ? `/video/${video.video_id}` : demoVideoUrl}>
          <Typography variant="subtitle1" fontWeight="bold" color="#fff">
            {(video?.title?.length > 60
              ? video?.title?.slice(0, 60) + "..."
              : video?.title) || demoVideoTitle.slice(0, 60)}
          </Typography>
        </Link>
        <Link
          to={
            video.channel_id ? `/channel/${video.channel_id}` : demoChannelUrl
          }
        >
          <Typography variant="subtitle2" fontWeight="bold" color="gray">
            {video?.author.slice(0, 60) || demoChannelTitle.slice(0, 60)}
            <CheckCircle sx={{ fontSize: 12, color: "gray", ml: "5px" }} />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
