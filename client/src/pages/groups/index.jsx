import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Drawer, Grid, IconButton, Tooltip } from '@mui/material'
import {
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from '@mui/icons-material'
import { matBlack } from '../../constants/color'
import GroupList from '../../components/shared/groupList'
import { samepleChats } from '../../constants/sampleData'

const Group = () => {
  const [isMobileOpenMenu, setIsMobileOpenMenu] = useState(false)
  const navigate = useNavigate()
  const navigateToBack = () => navigate('/')
  const handleMobile = () => {
    setIsMobileOpenMenu((prve) => !prve)
  }
  const handleMobileClose = () => {
    setIsMobileOpenMenu(false)
  }
  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: 'block',
            sm: 'none',
            position: 'fixed',
            top: '1rem',
            right: '1rem',
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Tooltip title="back">
        <IconButton
          sx={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            backgroundColor: matBlack,
            color: 'white',
            ':hover': {
              bgcolor: 'rgba(0,0,0,0.7)',
            },
          }}
          onClick={navigateToBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  )
  return (
    <Grid container height={'100vh'}>
      <Grid
        item
        sx={{
          display: {
            xs: 'none',
            sm: 'block',
          },
        }}
        sm={4}
        bgcolor="bisque"
      >
        <GroupList myGroups={samepleChats} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {IconBtns}
      </Grid>
      <Drawer
        sx={{
          display: {
            xs: 'block',
            sm: 'none',
          },
        }}
        open={isMobileOpenMenu}
        onClose={handleMobileClose}
      >
        <GroupList width={'50vw'} />
      </Drawer>
    </Grid>
  )
}

export default Group
