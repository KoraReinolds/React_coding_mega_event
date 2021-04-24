import { configureStore } from '@reduxjs/toolkit'
import fieldsReducer from '../features/fieldsSlice'

export const store = configureStore({
  reducer: {
    fields: fieldsReducer,
  },
})
