import React, { useState } from 'react'
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { CameraAlt as CameraAltIcon } from '@mui/icons-material'
import {VisuallyHiddenInput} from '../../components/styles/StyleComponent'
import { useFileHandler, useInputValidation, useStrongPassword } from '6pp'
import { usernameValidator } from '../../utills/validators'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const name = useInputValidation('')
  const username = useInputValidation('', usernameValidator)
  const bio = useInputValidation('')
  const password = useStrongPassword()
  const avatar = useFileHandler('single')
  const handlelogin = (e) => {
    e.preventDefault()
  }
  const handleSignup = (e) => {
    e.preventDefault()
  }
  return (
    <Container
      component={'main'}
      maxWidth="xs"
      sx={{
        height: '100vh',
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
        {isLogin ? (
          <>
            <Typography variant="h5"> Login</Typography>
            <form
              style={{
                width: '100%',
                margginTop: '1rem',
              }}
              onSubmit={handlelogin}
            >
              <TextField
                required
                fullWidth
                label="username"
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
              />
              {username?.error && (
                <Typography color="error" variant="caption">
                  {username?.error}
                </Typography>
              )}
              <TextField
                required
                fullWidth
                label="password"
                type="password"
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
              />
              {password?.error && (
                <Typography color="error" variant="caption">
                  {password?.error}
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
              <Typography textAlign={'center'} sx={{ margin: '1rem' }}>
                OR
              </Typography>
              <Button
                fullWidth
                variant="text"
                onClick={() => setIsLogin(!isLogin)}
              >
                Register
              </Button>
            </form>
          </>
        ) : (
          <>
            <form
              style={{
                width: '100%',
                margginTop: '2rem',
              }}
              onSubmit={handleSignup}
            >
              <Stack position={'relative'} width={'1rem'} marginLeft={'5rem'}>
                <Avatar
                  sx={{
                    width: '9rem',
                    height: '9rem',
                    objectFit: 'contain',
                  }}
                  src={avatar.preview}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: '0',
                    left: '110px',
                    color: 'white',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    ':hover': {
                      bgcolor: 'rgba(0,0,0,0.7)',
                    },
                  }}
                  component="label"
                >
                  <>
                    <CameraAltIcon />
                    <VisuallyHiddenInput
                      type="file"
                      onChange={avatar.changeHandler}
                    />
                  </>
                </IconButton>
              </Stack>
              {avatar.error && (
                <Typography
                  m={'1rem auto'}
                  width={'fit-content'}
                  display={'block'}
                  color="error"
                  variant="caption"
                >
                  {avatar.error}
                </Typography>
              )}
              <TextField
                required
                fullWidth
                label="name"
                margin="normal"
                variant="outlined"
                value={name.value}
                onChange={name.changeHandler}
              />
              <TextField
                required
                fullWidth
                label="bio"
                margin="normal"
                variant="outlined"
                value={bio.value}
                onChange={bio.changeHandler}
              />
              <TextField
                required
                fullWidth
                label="username"
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
              />
              {username?.error && (
                <Typography color="error" variant="caption">
                  {username?.error}
                </Typography>
              )}
              <TextField
                required
                fullWidth
                label="password"
                type="password"
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
              />
              {password?.error && (
                <Typography color="error" variant="caption">
                  {password?.error}
                </Typography>
              )}
              <Button
                sx={{ marginTop: '1rem' }}
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Signup
              </Button>
              <Typography textAlign={'center'} sx={{ margin: '1rem' }}>
                OR
              </Typography>
              <Button
                fullWidth
                variant="text"
                onClick={() => setIsLogin(!isLogin)}
              >
                Login
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  )
}

export default Login
