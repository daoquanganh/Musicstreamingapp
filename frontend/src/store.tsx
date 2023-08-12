import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import tokenReducer from './reducers/tokenReducer'

export const store = configureStore({
  reducer: {
    user: userReducer,
    token: tokenReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
