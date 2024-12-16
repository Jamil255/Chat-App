import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../constants/sampleData'
import UserItem from '../components/shared/userItem/index'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddMember } from '../redux/slice/misc/misc'
import {
  useAddGroupMemberMutation,
  useGetMyFriendsQuery,
} from '../redux/api/api'
import { useAsyncMutation, useErrors } from '../hook'

const AddMemberDialog = ({ chatId }) => {
  const [selectMember, setSelectMembers] = useState([])
  const dispatch = useDispatch()
  const { isAddMember } = useSelector((state) => state.misc)

  const { data, isError, error, isLoading } = useGetMyFriendsQuery(chatId)
  const [addMember, isLoadingAddMember] = useAsyncMutation(
    useAddGroupMemberMutation
  )

  const selectMemberHandler = (id) => {
    setSelectMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    )
  }
  const onCloseHandler = () => {
    dispatch(setIsAddMember(false))
  }
  const addMemberSubmitHandler = () => {
    onCloseHandler()
    addMember('Add Member ..', { chatId, members: selectMember })
  }
  return (
    <Dialog open={isAddMember} onClose={onCloseHandler}>
      <Stack p={'2rem'} spacing={'2rem'} width={'20rem'}>
        <DialogTitle textAlign={'center'}>Add Member</DialogTitle>
        <Stack spacing={'1rem'}>
          {isLoading ? (
            <Skeleton />
          ) : data?.friends?.length > 0 ? (
            data?.friends?.map((i) => (
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
