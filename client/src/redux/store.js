import { configureStore } from '@reduxjs/toolkit'
import signupSlice from './slice/auth/signupSlice'
import api from './api/api'
import miscSlice from './slice/misc/misc'
import chatSlice from './slice/chat'
const store = new configureStore({
  reducer: {
    [signupSlice.name]: signupSlice.reducer,
    [miscSlice.name]: miscSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (mid) => [...mid(), api.middleware],
})

export default store
