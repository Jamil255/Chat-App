import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import React, { lazy, Suspense, useState } from 'react'
import { orange } from '../../constants/color.js'
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Logout as LogoutIcon,
  Group as GroupIcon,
  Add as AddIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material'
import IconBtn from '../IconBtn'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { server } from '../../constants/confing.js'
import { useDispatch, useSelector } from 'react-redux'
import { userNotExists } from '../../redux/slice/auth/signupSlice.js'
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from '../../redux/slice/misc/misc.js'
import { resetNotification } from '../../redux/slice/chat/index.jsx'

const SearchDialog = lazy(() => import('../Search'))
const NotificationDialog = lazy(() => import('../Notification'))
const NewGroupDialog = lazy(() => import('../NewGroup'))

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleMobile = () => dispatch(setIsMobile(true))
  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  )
  const { notificationCount } = useSelector((state) => state.chat)

  const openSearch = () => dispatch(setIsSearch(true))

  const openNewGroup = () => {
    dispatch(setIsNewGroup(true))
  }

  const navigateToGroup = () => navigate('/group')

  const logoutHandler = async () => {
    const { data } = await axios.get(`${server}/user/logout`, {
      withCredentials: true,
    })
    toast.error(data?.message)
    dispatch(userNotExists())
  }

  const openNotification = () => {
    dispatch(setIsNotification(true))
    dispatch(resetNotification())
  }

  const closeNotification = () => dispatch(setIsNotification(false))

  const closeSearch = () => dispatch(setIsSearch(false))
  const closeNewGroup = () => {
    dispatch(setIsNewGroup(false))
  }

  return (
    <>
      <Box sx={{ flexFlow: 1 }} height={'4rem'}>
        <AppBar
          position="static"
          sx={{
            bgcolor: orange,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Chat App
            </Typography>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconBtn
                title={'Search'}
                icon={<SearchIcon />}
                onClick={openSearch}
              />
              <IconBtn
                title={'New Group'}
                icon={<AddIcon />}
                onClick={openNewGroup}
              />
              <IconBtn
                title={'Manage Groups'}
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />
              <IconBtn
                title={'Notifications'}
                icon={<NotificationsIcon />}
                onClick={openNotification}
                value={notificationCount}
              />
              <IconBtn
                title={'Logout'}
                icon={<LogoutIcon />}
                onClick={logoutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog onClose={closeSearch} />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog onClose={closeNewGroup} />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationDialog onClose={closeNotification} />
        </Suspense>
      )}
    </>
  )
}

export default Header
