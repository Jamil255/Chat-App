import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  data:true,
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
      (state.data = null), (state.isLoading = false)
    },
  },
})

export default signupSlice
export const {userExists,userNotExists }=signupSlice.actions