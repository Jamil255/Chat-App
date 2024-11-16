import React from 'react'
import {
  Dialog,
  DialogTitle,
  Stack,
  Typography,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import NotificationItem from './shared/notificationItem'
import { sampleNotifications } from '../constants/sampleData'

const Notification = ({ onClose }) => {
  const friendRequestHandler = (_id, accept) => {
  }

  return (
    <Dialog
      open
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          maxWidth: '400px',
          width: '100%',
        },
      }}
    >
      <Stack p={{ xs: '1rem', sm: '2rem' }}>
        <DialogTitle>
          Notifications
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        {sampleNotifications.length > 0 ? (
          sampleNotifications.map((sender, _id) => (
            <NotificationItem
              key={_id}
              sender={sender}
              _id={_id}
              handler={friendRequestHandler}
            />
          ))
        ) : (
          <Typography textAlign={'center'}>0 Notifications</Typography>
        )}
      </Stack>
    </Dialog>
  )
}

export default Notification
