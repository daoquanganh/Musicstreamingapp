import { createReducer, createAction } from '@reduxjs/toolkit'

export interface UserState {
  id: number
  // email: string
}

const initialState: UserState = {
  id: 0
  // email: ''
}

export const addUser = createAction<UserState>('user/')
export const deleteUser = createAction<UserState>('user/deleteUser')

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addUser, (state, action) => {
      const addedUser = action.payload
      state.id = addedUser.id
      // state.email = addedUser.email
    })
    .addCase(deleteUser, (state, action) => {
      const user = action.payload
      if (state.id == user.id) {
        state.id = 0
        // state.email = ''
      }
    })
})
export default userReducer
