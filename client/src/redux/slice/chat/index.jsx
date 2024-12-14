import { createSlice } from '@reduxjs/toolkit'
import { getOrSaveFromStorage } from '../../../lib/feature'
import { NEW_MESSAGE_ALERT } from '../../../constants/event'
const initialState = {
  notificationCount: 0,
  newMessagesAlert: getOrSaveFromStorage({
    key: NEW_MESSAGE_ALERT,
    get: true,
  }) || [
    {
      chatId: '',
      count: 0,
    },
  ],
}
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    incrementNotification: (state, action) => {
      state.notificationCount += 1
    },
    resetNotification: (state, action) => {
      state.notificationCount = 0
    },
    setNewMessagesAlert: (state, action) => {
      const chatId = action.payload.chatId

      const index = state.newMessagesAlert.findIndex(
        (item) => item.chatId === chatId
      )

      if (index !== -1) {
        state.newMessagesAlert[index].count += 1
      } else {
        state.newMessagesAlert.push({
          chatId,
          count: 1,
        })
      }
    },
    deletMessagesAlert: (state, action) => {
      state.newMessagesAlert = state.newMessagesAlert.filter(
        (item) => item.chatId !== action.payload
      )
    },
  },
})

export default chatSlice
export const {
  incrementNotification,
  resetNotification,
  setNewMessagesAlert,
  deletMessagesAlert,
} = chatSlice.actions
