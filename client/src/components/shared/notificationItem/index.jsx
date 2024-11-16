import { Avatar, Button, ListItem, Stack, Typography } from '@mui/material'
import React, { memo, useMemo } from 'react'

const NotificationItem = ({ sender, _id, handler }) => {
  const { name, avatar } = sender?.sender
  return (
    <ListItem>
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={'1rem'}
        width={'100%'}
      >
        <Avatar />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxContent: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
          }}
        >
          {name}
        </Typography>
        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
        >
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  )
}

export default memo(NotificationItem)
