import { Stack, Typography } from '@mui/material'
import React from 'react'
import GroupListItem from '../groupItem'
import { bgGradient } from '../../../constants/color'
const GroupList = ({ width = '100%', myGroups = [], chatId }) => {
  console.log(myGroups)
  return (
    <Stack
      width={width}
      sx={{
        backgroundImage: bgGradient,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      {myGroups?.length > 0 ? (
        myGroups.map((group) => (
          <GroupListItem group={group} chatId={chatId} key={group._id} />
        ))
      ) : (
        <Typography textAlign={'center'} padding={'1rem'}>
          No groups
        </Typography>
      )}
    </Stack>
  )
}

export default GroupList
