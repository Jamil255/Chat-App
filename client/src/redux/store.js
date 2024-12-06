import { configureStore } from '@reduxjs/toolkit'
import signupSlice from './slice/auth/signupSlice'
import api from './api/api'
const store = new configureStore({
  reducer: {
    [signupSlice.name]: signupSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (mid) => [...mid(), api.middleware],
})

export default store

