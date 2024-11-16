import {
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React, { useState } from 'react'
import { sampleUsers } from '../constants/sampleData'
import UserItem from './shared/userItem'
const NewGroup = ({ onClose }) => {
  const [groupName, setGroupName] = useState('')
  const [member, setMember] = useState(sampleUsers)
  const [selectMember, setSelectMembers] = useState([])
  const selectMemberHandler = (id) => {
    setSelectMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    )
  }
  const submitHandler = () => {}
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
          {member?.map((user) => (
            <UserItem
              user={user}
              key={user?._id}
              handler={selectMemberHandler}
              isAdded={selectMember.includes(user?._id)}
            />
          ))}
        </Stack>

        <Stack
          direction={'row'}
          justifyContent={'space-evenly'}
          marginTop={'10px'}
        >
          <Button variant="contained" color="error" size="large">
            Cancel
          </Button>
          <Button variant="contained" size="large" onClick={submitHandler}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroup
