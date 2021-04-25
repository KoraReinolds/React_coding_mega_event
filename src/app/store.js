import { configureStore } from '@reduxjs/toolkit'
import fieldsReducer from '../redux/fieldsSlice'

export const store = configureStore({
  reducer: {
    fields: fieldsReducer,
  },
})
