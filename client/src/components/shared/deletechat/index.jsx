import { Menu, Stack, Typography } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Delete as DeleteIcon,
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import {
  useDeleteChatMutation,
  useLeaveGroupMutation,
} from '../../../redux/api/api'
import { useAsyncMutation } from '../../../hook'
import { setSelectDeleteChat } from '../../../redux/slice/misc/misc'

const DeleteChatMenu = ({ deleteMenuAnchor }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isDeleteMenu, selectDeleteChat } = useSelector((state) => state.misc)
  const [deleteChat, _, deleteChatData] = useAsyncMutation(
    useDeleteChatMutation
  )

  const [leaveGroup, __, leaveGroupData] = useAsyncMutation(
    useLeaveGroupMutation
  )

  const isGroup = selectDeleteChat?.groupChat

  const closeHandler = () => {
    dispatch(setSelectDeleteChat(false))
    if (deleteMenuAnchor && deleteMenuAnchor.current) {
      deleteMenuAnchor.current = null
    }
  }

  const leaveGroupHandler = () => {
    closeHandler()
    leaveGroup('Leaving Group...', selectDeleteChat.chatId)
  }

  const deleteChatHandler = () => {
    closeHandler()
    deleteChat('Deleting Chat...', selectDeleteChat.chatId)
  }

  useEffect(() => {
    if (deleteChatData || leaveGroupData) navigate('/')
  }, [deleteChatData, leaveGroupData])

  return (
    deleteMenuAnchor?.current && (
      <Menu
        open={isDeleteMenu}
        onClose={closeHandler}
        anchorEl={deleteMenuAnchor.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <Stack
          sx={{
            width: '10rem',
            padding: '0.5rem',
            cursor: 'pointer',
          }}
          direction={'row'}
          alignItems={'center'}
          spacing={'0.5rem'}
          onClick={isGroup ? leaveGroupHandler : deleteChatHandler}
        >
          {isGroup ? (
            <>
              <ExitToAppIcon />
              <Typography>Leave Group</Typography>
            </>
          ) : (
            <>
              <DeleteIcon />
              <Typography>Delete Chat</Typography>
            </>
          )}
        </Stack>
      </Menu>
    )
  )
}

export default DeleteChatMenu
