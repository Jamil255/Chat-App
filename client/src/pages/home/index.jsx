import React from 'react'
import AppLayout from '../../components/layout'
import { Box, Typography } from '@mui/material'
import { grayColor } from '../../constants/color.js'

const Home = () => {
  return (
    <Box
      sx={{
        bgcolor: grayColor,
      }}
      height={'100%'}
    >
      <Typography p={'2rem'} variant="h5" textAlign={'center'}>
        Select a friend to chat
      </Typography>
    </Box>
  )
}

export default AppLayout()(Home)
