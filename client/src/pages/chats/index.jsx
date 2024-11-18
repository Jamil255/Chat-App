import React, { useRef } from 'react'
import AppLayout from '../../components/layout'
import { IconButton, Stack } from '@mui/material'
import { grayColor, organe } from '../../constants'
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from '@mui/icons-material'
import { InputBox } from '../../components/styles/StyleComponent'

const Chats = () => {
  const containerRef = useRef(null)
  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={'border-box'}
        padding={'1rem'}
        spacing={'1rem'}
        height={'90%'}
        sx={{
          overflow: 'hidden',
          overflowY: 'auto',
          backgroundColor: grayColor,
        }}
      >
        {/* {message Render} */}
      </Stack>
      <form
        style={{
          height: '10%',
        }}
      >
        <Stack
          direction={'row'}
          height={'100%'}
          padding={'1rem'}
          alignItems={'center'}
          position={'relative'}
        >
          <IconButton
            sx={{
              position: 'absolute',
              left: '0.8rem',
              rotate: '-30deg',
            }}
          >
            <AttachFileIcon />
          </IconButton>
          <InputBox placeholder=" Type Message  Here.." />
          <IconButton
            sx={{
              bgcolor: organe,
              color: 'white',
              marginLeft: '1rem',
              padding: '0.5rem',
              '&:hover': {
                bgcolor: 'error.dark',
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
    </>
  )
}

export default AppLayout()(Chats)
