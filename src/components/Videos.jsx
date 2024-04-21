import React, { useState, useEffect } from "react";
import { Stack, Box } from "@mui/material";
import { VideoCard, ChannelCard, Loader } from "../components";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const Videos = ({ videos, direction, toRender, isSearch }) => {
  const [channelInfo, setChannelInfo] = useState(null);

  useEffect(() => {
    if (toRender) {
      const showChannelCard = () => {
        let channelCountMap = {};
        let mostCommonChannelID = "";
        let maxCount = 0;

        videos.forEach((video) => {
          const channelId = video?.channel_id;
          if (channelId) {
            channelCountMap[channelId] = (channelCountMap[channelId] || 0) + 1;
            if (channelCountMap[channelId] > maxCount) {
              mostCommonChannelID = channelId;
              maxCount = channelCountMap[channelId];
            }
          }
        });

        if (maxCount > videos.length / 2) {
          fetchFromAPI(`channel/details?channel_id=${mostCommonChannelID}`)
            .then((data) => {
              console.log(data);
              setChannelInfo(data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      };

      showChannelCard();
    }
  }, [videos]);

  if (!videos?.length) return <Loader />;

  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      justifyContent={isSearch? "center" : {sm: "center", md: "flex-start"} }
      alignItems="center"
      gap={2}
      width="100%"
    >
      {channelInfo && toRender && <ChannelCard channelDetail={channelInfo} />}
      {videos.map((item, index) => (
        <Box key={index}>{item.video_id && <VideoCard video={item} />}</Box>
      ))}
    </Stack>
  );
};

export default Videos;
