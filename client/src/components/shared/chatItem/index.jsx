import React, { memo } from 'react'
import { Link } from '../../styles/StyleComponent'
import { Typography, Stack, Box } from '@mui/material'
import AvatarCard from '../AvatarCard'

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleChatDelete,
}) => {
  return (
    <Link
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleChatDelete(e, _id, groupChat)}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '1rem',
          gap: '1rem',
          backgroundColor: sameSender ? 'black' : 'unset',
          color: sameSender ? 'white' : 'unset',
          position: 'relative',
        }}
      >
        <AvatarCard avatar={avatar} />

        <Stack>
          <Typography>{name}</Typography>
          {newMessageAlert && (
            <Typography>{newMessageAlert.count} new Message</Typography>
          )}
        </Stack>
        {isOnline && (
          <Box
            sx={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'green',
              position: 'absolute',
              top: '50%',
              right: '1rem',
              transform: 'translateY(-50%)',
            }}
          />
        )}
      </div>
    </Link>
  )
}

export default memo(ChatItem)
