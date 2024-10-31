import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  )
}

export default IconBtn
