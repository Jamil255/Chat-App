import {
  Dialog,
  DialogTitle,
  IconButton,
  InputAdornment,
  List,
  Stack,
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Search as SearchIcon } from '@mui/icons-material'
import { useInputValidation } from '6pp'
import UserItem from './shared/userItem'
import { sampleUsers } from '../constants/sampleData'
import CloseIcon from '@mui/icons-material/Close'
import { useSelector } from 'react-redux'
import { useLazySearchUserQuery } from '../redux/api/api'
const Search = ({ onClose }) => {
  const [user, setUser] = useState([])
  const search = useInputValidation('')
  const { isSearch } = useSelector((state) => state.misc)
  const [searchUser] = useLazySearchUserQuery()
  const addFriendHandler = (id) => {}
  const isLoadingSendFriendRequest = false

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUser(data?.allUsers))
        .catch((e) => console.log(e))
    }, 1000)
    return () => {
      clearTimeout(timeOutId)
    }
  }, [search.value])
  return (
    <Dialog open={isSearch} onClose={onClose}>
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
