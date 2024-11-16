import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from '@mui/material'
import React, { useState } from 'react'
import { Search as SearchIcon } from '@mui/icons-material'
import { useInputValidation } from '6pp'
import UserItem from './shared/userItem'
import { sampleUsers } from '../constants/sampleData'
const user = [1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
const Search = () => {
  const [user, setUser] = useState(sampleUsers)
  const search = useInputValidation()
  const addFriendHandler = (id) => {
    console.log(id)
  }
  const isLoadingSendFriendRequest = false

  return (
    <Dialog open>
      <Stack p={'2rem'} direction={'column'} width={'25rem'}>
        <DialogTitle textAlign={'center'}> Find People</DialogTitle>
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
