import { Badge, IconButton, Tooltip } from '@mui/material'
import React from 'react'
const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {value ? <Badge badgeContent={value} color="error">{icon}</Badge> : icon }
      </IconButton>
    </Tooltip>
  )
}

export default IconBtn
