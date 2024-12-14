import React, { useCallback, useEffect } from 'react'
import Header from './Header'
import Tittle from '../shared/tittle'
import { Drawer, Grid, Skeleton } from '@mui/material'
import ChatList from '../ChatList'
import { useParams } from 'react-router-dom'
import Profile from '../Profile'
import { useMyChatsQuery } from '../../redux/api/api'
import { useDispatch, useSelector } from 'react-redux'
import { setIsMobile } from '../../redux/slice/misc/misc'
import { useErrors, useSocketEvents } from '../../hook'
import { getSocket } from '../../socket'
import { NEW_MESSAGE_ALERT, NEW_REQUEST } from '../../constants/event.js'
import {
  incrementNotification,
  setNewMessagesAlert,
} from '../../redux/slice/chat/index.jsx'
import { getOrSaveFromStorage } from '../../lib/feature.js'

// it is HOC high order components take a component as a argument and return a new component
const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const { chatId } = useParams()
    const { isMobile } = useSelector((state) => state.misc)
    const { newMessagesAlert } = useSelector((state) => state.chat)
    const dispatch = useDispatch()
    const socket = getSocket()
    const { isLoading, error, isError, isFetching, data } = useMyChatsQuery()
    const handleMobileClose = () => dispatch(setIsMobile(false))
    useErrors([{ isError, error }])

    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert })
    }, [newMessagesAlert])
    const newMessagesAlretHandler = useCallback(
      (data) => {
        if (data.chatId == chatId) return
        dispatch(setNewMessagesAlert(data))
      },
      [chatId]
    )
    const newRequestHandler = useCallback(() => {
      dispatch(incrementNotification())
    }, [])
    const eventListeners = {
      [NEW_MESSAGE_ALERT]: newMessagesAlretHandler,
      [NEW_REQUEST]: newRequestHandler,
    }
    useSocketEvents(socket, eventListeners)
    const handleChatDelete = (e, _id, groupChat) => {
      e.prevenetDefualt()
      console.log(_id, groupChat)
    }

    return (
      <>
        <Tittle />
        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer
            open={isMobile}
            onClose={handleMobileClose}
            sx={{
              display: {
                xs: 'block',
                sm: 'none',
              },
            }}
          >
            <ChatList
              width={'60vh'}
              chats={data?.chats}
              chatId={chatId}
              newMessagesAlert={newMessagesAlert}
              onlineUsers={['1', '2', '3']}
              handleChatDelete={handleChatDelete}
            />
          </Drawer>
        )}
        <Header />
        <Grid container height="100vh" alignItems="stretch">
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: 'none', sm: 'block' },
              height: '100%',
            }}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                newMessagesAlert={newMessagesAlert}
                onlineUsers={['1', '2', '3']}
                handleChatDelete={handleChatDelete}
              />
            )}
          </Grid>

          <Grid item xs={12} sm={8} md={5} lg={6} sx={{ height: '100%' }}>
            <WrappedComponent {...props} chatId={chatId} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            sx={{
              display: { xs: 'none', md: 'block' },
              height: '100%',
              bgcolor: 'rgba(0,0,0,0.85)',
              padding: '4rem',
            }}
          >
            <Profile />
          </Grid>
        </Grid>
      </>
    )
  }
}

export default AppLayout
