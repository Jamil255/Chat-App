import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { server } from '../../constants/confing'
const adminLogin = createAsyncThunk(
  'admin/login',
  async (secretKey, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
        Headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `${server}/admin/verify`,
        { secretKey },
        config
      )
      return data.message
    } catch (error) {
      throw error.response.data.message
    }
  }
)

const getAdmin = createAsyncThunk('getAdmin', async () => {
  try {
    const { data } = await axios.get(`${server}/admin`, {
      withCredentials: true,
    })
    return data
  } catch (error) {
    throw error?.response?.data?.message
  }
})

const adminLogOut = createAsyncThunk('admin/logout', async () => {
  try {
    const data = await axios.get(`${server}/admin/out`, {
      withCredentials: true,
    })
    return data.data
  } catch (error) {
      console.error(error)
    throw error.response.data.message
  }
})
export { adminLogin, getAdmin, adminLogOut }
