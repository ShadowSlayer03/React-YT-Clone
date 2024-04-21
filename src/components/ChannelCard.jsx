import React from 'react';
import { Box, CardContent, CardMedia, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import { demoProfilePicture } from '../utils/constants';

const ChannelCard = ({ channelDetail, marginTop="marginTop: 1px" }) => (
  <Box
    sx={{
      boxShadow: 'none',
      borderRadius: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: { xs: '356px', md: '320px' },
      height: '326px',
      marginTop,
    }}
  >
    <Link to={`/channel/${channelDetail?.channel_id}`}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "center", color: '#fff' }}>
        <CardMedia
          image={channelDetail?.avatar[channelDetail.avatar.length-1]?.url || demoProfilePicture}
          alt={channelDetail?.title}
          sx={{ borderRadius: '50%', height: '180px', width: '180px', mb: 2, border: '1px solid #e3e3e3' }}
        />
        <Typography variant="h6">
          {channelDetail?.title}{' '}
          <CheckCircleIcon sx={{ fontSize: '14px', color: 'gray', ml: '5px', textAlign: "center" }} />
        </Typography>
        {channelDetail?.subscriber_count && (
          <Typography sx={{ fontSize: '15px', fontWeight: 500, color: 'gray', textAlign: 'center', }}>
            {channelDetail?.subscriber_count}
          </Typography>
        )}
      </CardContent>
    </Link>
  </Box>
);

export default ChannelCard;
