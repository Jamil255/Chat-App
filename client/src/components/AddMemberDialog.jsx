import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../constants/sampleData'
import UserItem from '../components/shared/userItem/index'

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
  const [member, setMember] = useState(sampleUsers)
  const [selectMember, setSelectMembers] = useState([])
  const selectMemberHandler = (id) => {
    setSelectMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    )
  }
  const onCloseHandler = () => {
    setMember([])
    setSelectMembers([])
  }
  const addMemberSubmitHandler = () => {
    onCloseHandler()
  }
  return (
    <Dialog open onClose={onCloseHandler}>
      <Stack p={'2rem'} spacing={'2rem'} width={'20rem'}>
        <DialogTitle textAlign={'center'}>Add Member</DialogTitle>
        <Stack spacing={'1rem'}>
          {member.length > 0 ? (
            member?.map((i) => (
              <UserItem
                key={i._id}
                user={i}
                handler={selectMemberHandler}
                isAdded={selectMember.includes(i._id)}
              />
            ))
          ) : (
            <Typography textAlign={'center'}>No Friend </Typography>
          )}
        </Stack>
      </Stack>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-evenly'}
        margin={'4px'}
      >
        <Button variant="contained" color="error" onClick={onCloseHandler}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={isLoadingAddMember}
          onClick={addMemberSubmitHandler}
        >
          Submit
        </Button>
      </Stack>
    </Dialog>
  )
}

export default AddMemberDialog
