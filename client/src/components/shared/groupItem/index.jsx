import React, { memo } from 'react'
import { Link } from '../../styles/StyleComponent'
import { Stack, Typography } from '@mui/material'
import AvatarCard from '../AvatarCard'
const GroupListItem = ({ group, chatId }) => {
  const { name, avatar, _id } = group
  return (
    <Link>
      <Stack>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  )
}

export default memo(GroupListItem)
