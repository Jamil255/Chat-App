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

const SearchDialog = lazy(() => import('../Search'))
const NotificationDialog = lazy(() => import('../Notification'))
const NewGroupDialog = lazy(() => import('../NewGroup'))

const Header = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isSearch, setIsSearch] = useState(false)
  const [isNotification, setIsNotification] = useState(false)
  const [isNewGroup, setIsNewGroup] = useState(false)

  const handleMobile = () => {
    setIsMobile(!isMobile)
  }

  const openSearch = () => {
    setIsSearch((prev) => !prev)
  }

  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev)
  }

  const navigateToGroup = () => {
    console.log('navigateToGroup')
  }

  const logoutHandler = () => {
    console.log('logoutHandler')
  }

  const openNotification = () => {
    setIsNotification((prev) => !prev)
  }

  const closeNotification = () => {
    setIsNotification(false) // Close notification dialog
  }

  const closeSearch = () => {
    setIsSearch(false) // Close notification dialog
  }
  const closeNewGroup = () => {
    setIsNewGroup(false) // Close notification dialog
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
