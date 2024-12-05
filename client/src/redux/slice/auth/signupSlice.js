import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  user: null,
  isAdmin: false,
  isLoading: true,
}
const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    userExists: (state, action) => {
      state.user = action.payload
      state.isLoading = false
    },
    userNotExists: (state, action) => {
      ;(state.user = null), (state.isLoading = false)
    },
  },
})

export default signupSlice
export const {userExists,userNotExists }=signupSlice.actions