import { Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import React from 'react'
import NotificationItem from './shared/notificationItem'
import { sampleNotifications } from '../constants/sampleData'

const Notification = () => {
  const friendRequestHandler = (_id, accept) => {
    // add friend request
    console.log(_id, accept)
  }
  return (
    <Dialog open>
      <Stack p={{ xs: '1rem', sm: '2rem' }} maxWidth={'25rem'}>
        <DialogTitle>Notification</DialogTitle>
        {sampleNotifications.length > 0 ? (
          sampleNotifications?.map((sender, _id) => (
            <NotificationItem
              sender={sender}
              _id={_id}
              handler={friendRequestHandler}
              key={_id}
            />
          ))
        ) : (
          <Typography textAlign={'center'}>0 Notification</Typography>
        )}
      </Stack>
    </Dialog>
  )
}

export default Notification
