import { Stack, Typography } from '@mui/material'
import React from 'react'
import GroupListItem from '../groupItem'
const GroupList = ({ width = '100%', myGroups = [], chatId }) => {
  return (
    <Stack>
      {myGroups?.length>0 ? (
        myGroups.map((group) => <GroupListItem  group={group} chatId={chatId} key={group._id} />)
      ) : (
        <Typography textAlign={'center'} padding={'1rem'}>
          No groups
        </Typography>
      )}
    </Stack>
  )
}

export default GroupList
