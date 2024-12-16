import CloseIcon from '@mui/icons-material/Close'
import {
  Dialog,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAsyncMutation, useErrors } from '../hook'
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from '../redux/api/api'
import { setIsNotification } from '../redux/slice/misc/misc'
import NotificationItem from './shared/notificationItem'

const Notification = ({ onClose }) => {
  const { isNotification } = useSelector((state) => state.misc)
  const dispatch = useDispatch()
  const { isLoading, data, isError, error } = useGetNotificationsQuery()
  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation)
  const friendRequestHandler = async (_id, accept = true) => {
    dispatch(setIsNotification(false))
    await acceptRequest('Accepting...', { requestId: _id, accept })
  }
  const handleClose = () => setIsNotification(false)
  useErrors([{ error, isError }])
  return (
    <Dialog
      open={isNotification}
      onClose={handleClose}
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

        {data?.allRequests?.length >0 ? (
          data?.allRequests?.map((sender, _id) => (
            <NotificationItem
              key={_id}
              sender={sender}
              _id={sender?._id}
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
