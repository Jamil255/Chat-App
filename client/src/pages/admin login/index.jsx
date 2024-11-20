import React from 'react'
import { bgGradient } from '../../constants/color'
import { Button, Container, Paper, TextField, Typography } from '@mui/material'
import { useInputValidation, useStrongPassword } from '6pp'

const AdminLogin = () => {
  const sceretKey = useStrongPassword()
  const handleAdminLogin = (e) => {
    e.preventDefault()
    console.log('sceret key', sceretKey.value)
  }
  return (
    <div
      style={{
        backgroundImage: bgGradient,
      }}
    >
      <Container
        component={'main'}
        maxWidth="xs"
        sx={{
          height: '110vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5"> Admin Login</Typography>
          <form
            style={{
              width: '100%',
              margginTop: '1rem',
            }}
            onSubmit={handleAdminLogin}
          >
            <TextField
              required
              fullWidth
              label="sceretKey"
              type="password"
              margin="normal"
              variant="outlined"
              value={sceretKey.value}
              onChange={sceretKey.changeHandler}
            />
            {sceretKey?.error && (
              <Typography color="error" variant="caption">
                {sceretKey?.error}
              </Typography>
            )}
            <Button
              sx={{ marginTop: '1rem' }}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  )
}

export default AdminLogin
