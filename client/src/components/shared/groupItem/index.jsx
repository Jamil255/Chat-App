import React, { memo } from 'react'
import { Link } from '../../styles/StyleComponent'
import { Stack, Typography } from '@mui/material'
import AvatarCard from '../AvatarCard'
const GroupListItem = ({ group, chatId }) => {
    const { name, avatar, _id } = group
    // console.log(_id,chatId);
    
  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault()
      }}
    >
      <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  )
}

export default memo(GroupListItem)
