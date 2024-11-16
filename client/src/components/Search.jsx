import {
  Dialog,
  DialogTitle,
  IconButton,
  InputAdornment,
  List,
  Stack,
  TextField,
} from '@mui/material'
import React, { useState } from 'react'
import { Search as SearchIcon } from '@mui/icons-material'
import { useInputValidation } from '6pp'
import UserItem from './shared/userItem'
import { sampleUsers } from '../constants/sampleData'
import CloseIcon from '@mui/icons-material/Close'
const Search = ({ onClose }) => {
  const [user, setUser] = useState(sampleUsers)
  const search = useInputValidation()
  const addFriendHandler = (id) => {
    console.log(id)
  }
  const isLoadingSendFriendRequest = false

  return (
    <Dialog open onClose={onClose}>
      <Stack p={'2rem'} direction={'column'} width={'25rem'}>
        <DialogTitle textAlign={'center'}>
          {' '}
          Find People
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
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {user?.map((user) => (
            <UserItem
              user={user}
              key={user?._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  )
}

export default Search
