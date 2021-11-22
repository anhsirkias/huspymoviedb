import { configureStore } from '@reduxjs/toolkit'
import { moviesReducer } from './reducer'

export default configureStore({
  reducer: moviesReducer,
})