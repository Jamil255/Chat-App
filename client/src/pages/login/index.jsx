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
import { VisuallyHiddenInput } from '../../components/styles/StyleComponent'
import { useFileHandler, useInputValidation, useStrongPassword } from '6pp'
import { usernameValidator } from '../../utills/validators'
import { bgGradient } from '../../constants/color'
import { server } from '../../constants/confing'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { userExists, userNotExists } from '../../redux/slice/auth/signupSlice'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const name = useInputValidation('')
  const userName = useInputValidation('', usernameValidator)
  const bio = useInputValidation('')
  //   const password = useStrongPassword()
  const password = useInputValidation('')
  const avatar = useFileHandler('single')
  const dispatch = useDispatch()
  const handlelogin = async (e) => {
    e.preventDefault()
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const { data } = await axios.post(
        `${server}/user/login`,
        {
          userName: userName.value,
          password: password.value,
        },
        config
      )
      dispatch(userExists(data?.data))
      toast.success(data?.message)
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  const handleSignup = async (e) => {
    try {
      e.preventDefault()
      const formData = new FormData()
      formData.append('name', name.value) // Append input field values
      formData.append('userName', userName.value)
      formData.append('bio', bio.value)
      formData.append('password', password.value)
      formData.append('avatar', avatar.file) // Ensure avatar is a file input

      // Set up configuration for the request
      const config = {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data', // Required for file uploads
        },
      }

      // Send the POST request
      const { data } = await axios.post(
        `${server}/user/signup`,
        formData,
        config
      )
      toast.success(data?.message)
      dispatch(userExists(data.data))
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
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
          height: '120vh',
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
                  label="userName"
                  margin="normal"
                  variant="outlined"
                  value={userName.value}
                  onChange={userName.changeHandler}
                />
                {userName?.error && (
                  <Typography color="error" variant="caption">
                    {userName?.error}
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
                  label="userName"
                  margin="normal"
                  variant="outlined"
                  value={userName.value}
                  onChange={userName.changeHandler}
                />
                {userName?.error && (
                  <Typography color="error" variant="caption">
                    {userName?.error}
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
    </div>
  )
}

export default Login
