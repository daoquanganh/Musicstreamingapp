import { createReducer, createAction } from '@reduxjs/toolkit'

interface TokenState {
  token: string
  username: string
}

const initialState: TokenState = {
  token: '',
  username: ''
}

export const addToken = createAction<TokenState>('token/')
export const deleteToken = createAction<TokenState>('token/deleteToken')

const tokenReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToken, (state, action) => {
      const addedToken = action.payload
      state.token = addedToken.token
      state.username = addedToken.username
    })
    .addCase(deleteToken, (state, action) => {
      const data = action.payload
      if (state.token === data.token && state.username === data.username) {
        state.token = ''
        state.username = ''
      }
    })
})
export default tokenReducer
