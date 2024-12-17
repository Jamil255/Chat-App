import {
    CalendarMonth as CalendarIcon,
    Face as FaceIcon,
    AlternateEmail as UserNameIcon,
} from '@mui/icons-material'
import { Avatar, Stack, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'
import { transformImage } from '../lib/feature'
const Profile = ({ user }) => {
    const { data } = useSelector((state) => state.signup)
 
  return (
    <Stack spacing={'2rem'} direction={'column'} alignItems={'center'}>
      <Avatar
        src={transformImage(data?.avatar?.url)}
        sx={{
          width: 200,
          height: 200,
          objectFit: 'contain',
          marginBottom: '1rem',
          border: '5px solid white',
        }}
      />
      <ProfileCard heading={'Bio'} text={data?.bio} />
      <ProfileCard
        heading={'Username'}
        text={data?.userName}
        Icon={<UserNameIcon />}
      />
      <ProfileCard heading={'Name'} text={data?.name} Icon={<FaceIcon />} />
      <ProfileCard
        heading={'Joined'}
        text={moment(data?.createdAt).fromNow()}
        Icon={<CalendarIcon />}
      />
    </Stack>
  )
}

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={'row'}
    alignItems={'center'}
    spacing={'1rem'}
    color={'white'}
    textAlign={'center'}
  >
    {Icon && Icon}

    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography color={'gray'} variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
)

export default Profile
