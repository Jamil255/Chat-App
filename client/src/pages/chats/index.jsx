import React, { useCallback, useEffect, useRef, useState } from 'react'
import AppLayout from '../../components/layout/AppLayout.jsx'
import { IconButton, Skeleton, Stack } from '@mui/material'
import { grayColor, orange } from '../../constants/color.js'
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from '@mui/icons-material'
import { InputBox } from '../../components/styles/StyleComponent'
import MessageComponent from '../../components/shared/messageComponent'
import { getSocket } from '../../socket'
import toast from 'react-hot-toast'
import { NEW_MESSAGE } from '../../constants/event.js'
import { useInfiniteScrollTop } from '6pp'
import {
  useChatDetailsQuery,
  useGetMyMessageQuery,
} from '../../redux/api/api.js'
import { useErrors, useSocketEvents } from '../../hook/index.jsx'
import { useDispatch, useSelector } from 'react-redux'
import FileMenu from '../../components/shared/fileMenu/index.jsx'
import { setFileMenu } from '../../redux/slice/misc/misc.js'

const Chats = ({ chatId }) => {
  const containerRef = useRef(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [page, setPage] = useState(1)
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null)
  const dispatch = useDispatch()
  const socket = getSocket()
  const user = useSelector((state) => state.signup)
  const { data, isLoading, isError, error, reFetch } = useChatDetailsQuery({
    chatId,
    skip: !chatId,
  })
  const oldChunkMessage = useGetMyMessageQuery({
    chatId,
    page,
  })

  const { data: oldMessage, setData: setOldMessage } = useInfiniteScrollTop(
    containerRef,
    oldChunkMessage?.data?.totalPage,
    page,
    setPage,
    oldChunkMessage?.data?.messages
  )
  const allMessages = [...oldMessage, ...messages]
  useErrors([
    { isError, error },
    { isError: oldChunkMessage.isError, error: oldChunkMessage.error },
  ])

  const handleFileOpen = (e) => {
    dispatch(setFileMenu(true))
    setFileMenuAnchor(e.currentTarget)
  }
  const submitHandler = (e) => {
    e.preventDefault()
    if (!message.trim()) return toast.error('input field required')

    socket.emit(NEW_MESSAGE, { chatId, members: data?.chat?.members, message })
    setMessage('')
  }
  useEffect(() => {
    return () => {
      setMessage("")
      setMessages([])
      setPage(1)
      setOldMessage([])
    }
  }, [chatId])
  const newMessagesListeners = useCallback(
    (data) => {
      if (data?.chatId !== chatId) return
      setMessages((prve) => [...prve, data.message])
    },
    [chatId]
  )
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
        {allMessages?.map((i) => (
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
            onClick={handleFileOpen}
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
      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </>
  )
}

export default AppLayout()(Chats)
