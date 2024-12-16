import {
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React, { useState } from 'react'
import { sampleUsers } from '../constants/sampleData'
import UserItem from './shared/userItem'
import { useDispatch, useSelector } from 'react-redux'
import { setIsNewGroup } from '../redux/slice/misc/misc'
import { useGetMyFriendsQuery, useNewGroupMutation } from '../redux/api/api'
import { useAsyncMutation, useErrors } from '../hook'
const NewGroup = ({ onClose }) => {
  const [groupName, setGroupName] = useState('')
  const [selectMember, setSelectMembers] = useState([])
  const dispatch = useDispatch()
  const { isNewGroup } = useSelector((state) => state.misc)
  const { data, isError, error, isLoading } = useGetMyFriendsQuery('')

  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation)

  useErrors([{ isError, error }])
  const selectMemberHandler = (id) => {
    setSelectMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    )
  }
  const submitHandler = () => {
    newGroup('Group creating ...', { name: groupName, members: selectMember })
    dispatch(setIsNewGroup(false))
  }
  const onCloseHandler = () => {
    dispatch(setIsNewGroup(false))
  }

  return (
    <Dialog
      open={isNewGroup}
      onClose={onCloseHandler}
      sx={{
        '& .MuiDialog-paper': {
          maxWidth: '400px',
          width: '100%',
        },
      }}
    >
      <Stack p={{ xs: '1rem', sm: '2rem' }} width={'25rem'} spacing={'1rem'}>
        <DialogTitle justifyContent={'center'} variant="h5">
          New Group
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
        <TextField
          label="create group"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <Typography>Member</Typography>
        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((user) => (
              <UserItem
                user={user}
                key={user?._id}
                handler={selectMemberHandler}
                isAdded={selectMember.includes(user?._id)}
              />
            ))
          )}
        </Stack>

        <Stack
          direction={'row'}
          justifyContent={'space-evenly'}
          marginTop={'10px'}
        >
          <Button
            variant="contained"
            color="error"
            size="large"
            onClick={onCloseHandler}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={submitHandler}
            disabled={isLoadingNewGroup}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroup
