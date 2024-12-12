import React, { useCallback, useEffect, useRef, useState } from 'react'
import AppLayout from '../../components/layout/AppLayout.jsx'
import { IconButton, Skeleton, Stack } from '@mui/material'
import { grayColor, orange } from '../../constants/color.js'
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from '@mui/icons-material'
import { InputBox } from '../../components/styles/StyleComponent'
import { sampleMessage } from '../../constants/sampleData'
import MessageComponent from '../../components/shared/messageComponent'
import { getSocket } from '../../socket'
import toast from 'react-hot-toast'
import { NEW_MESSAGE } from '../../constants/event.js'
import { useChatDetailsQuery } from '../../redux/api/api.js'
import { useSocketEvents } from '../../hook/index.jsx'

const user = {
  _id: 'jjdhhdnnnnjdnf',
  name: 'jamil afzal mughal',
}
const Chats = ({ chatId, members }) => {
  const containerRef = useRef(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const socket = getSocket()
  const { data, isLoading, isError, error, reFetch } = useChatDetailsQuery({
    chatId,
    skip: !chatId,
  })
  const submitHandler = (e) => {
    e.preventDefault()
    if (!message.trim()) return toast.error('input field required')

    socket.emit(NEW_MESSAGE, { chatId, members: data?.chat?.members, message })
    setMessage('')
  }
  const newMessagesListeners = useCallback((data) => {
    setMessages((prve) => [...prve, data.message])
  }, [])
  const listeners = {
    [NEW_MESSAGE]: newMessagesListeners,
  }
  useSocketEvents(socket, listeners)
  return isLoading ? (
    <Skeleton />
  ) : (
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
        {sampleMessage?.map((i) => (
          <MessageComponent message={i} user={user} key={i._id} />
        ))}
      </Stack>
      <form
        style={{
          height: '10%',
        }}
        onSubmit={submitHandler}
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
          <InputBox
            placeholder=" Type Message  Here.."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton
            type="submit"
            sx={{
              bgcolor: orange,
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
