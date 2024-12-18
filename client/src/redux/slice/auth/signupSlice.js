import { createSlice } from '@reduxjs/toolkit'
import { adminLogin, adminLogOut, getAdmin } from '../../thunks'
import { toast } from 'react-hot-toast'
const initialState = {
  data: true,
  isAdmin: false,
  isLoading: true,
}
const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    userExists: (state, action) => {
      state.data = action.payload
      state.isLoading = false
    },
    userNotExists: (state, action) => {
      ;(state.data = null), (state.isLoading = false)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(adminLogin.fulfilled, (state, action) => {
      state.isAdmin = true
      toast.success(action.payload)
    })
    builder.addCase(adminLogin.rejected, (state, action) => {
      state.isAdmin = false
      toast.error(action.error.message)
    })
    builder.addCase(getAdmin.rejected, (state, action) => {
      state.isAdmin = false
    })
    builder.addCase(getAdmin.fulfilled, (state, action) => {
      if (action.payload) {
        state.isAdmin = true
      } else {
        state.isAdmin = false
      }
    })
    builder.addCase(adminLogOut.rejected, (state, action) => {
      state.isAdmin = true
    })
    builder.addCase(adminLogOut.fulfilled, (state, action) => {
      state.isAdmin = false
      toast.success(action.payload.message)
    })
  },
})

export default signupSlice
export const { userExists, userNotExists } = signupSlice.actions
