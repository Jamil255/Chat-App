import { useInputValidation, useStrongPassword } from '6pp'
import { Button, Container, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { bgGradient } from '../../constants/color'
import { useDispatch, useSelector } from 'react-redux'
import { adminLogin, getAdmin } from '../../redux/thunks'

const AdminLogin = () => {
    const { isAdmin } = useSelector((state) => state.signup)
    console.log("BEHANCHADO",isAdmin)
  const dispatch = useDispatch()
  const sceretKey = useInputValidation()
  const navigate = useNavigate()
  const handleAdminLogin = (e) => {
    e.preventDefault()
    dispatch(adminLogin(sceretKey.value))
  }
  useEffect(() => {
      dispatch(getAdmin())
      if (isAdmin) navigate('/admin/dashboard')
  }, [dispatch])
  if (isAdmin) navigate('/admin/dashboard')
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
