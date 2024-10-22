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
import VisuallyHiddenInput from '../../components/styles/StyleComponent'
import { useInputValidation } from '6pp'
import { usernameValidator } from '../../utills/validators'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const name = useInputValidation('')
  const username = useInputValidation('', usernameValidator)
  const bio = useInputValidation('')
  const password = useInputValidation('')
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
            <Typography variant="h5"> sign up</Typography>
            <form
              style={{
                width: '100%',
                margginTop: '1rem',
              }}
            >
              <Stack position={'relative'} width={'1rem'} margin={'auto'}>
                <Avatar
                  sx={{
                    width: '9rem',
                    height: '9rem',
                    objectFit: 'contain',
                  }}
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
                    <VisuallyHiddenInput type="file" />
                  </>
                </IconButton>
              </Stack>
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
              {username.error && (
                <Typography color="error" variant="caption">
                  {username.error}
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
