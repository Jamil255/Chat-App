import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { organe } from '../../constants'
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Logout as LogoutIcon,
  Group as GroupIcon,
  Add as AddIcon,
} from '@mui/icons-material'
import IconBtn from '../IconBtn'

const Header = () => {
  const handleMobile = () => {
    console.log('handleMobile')
  }
  const openSearch = () => {
    console.log('openSearch')
  }
  const openNewGroup = () => {
    console.log('openNewGroup')
  }
  const navigateToGroup = () => {
    console.log('navigateToGroup')
  }
  const logoutHandler = () => {
    console.log('logoutHandler')
  }
  return (
    <>
      <Box sx={{ flexFlow: 1 }} height={'4rem'}>
        <AppBar
          position="static"
          sx={{
            bgcolor: organe,
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
              {/* <IconBtn
                title={"Notifications"}
                icon={<NotificationsIcon />}
                onClick={openNotification}
                value={notificationCount}
              /> */}

              <IconBtn
                title={'Logout'}
                icon={<LogoutIcon />}
                onClick={logoutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default Header
