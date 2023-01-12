/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: '',
}

export const getInitialState = () => {
  const stateLS = localStorage.getItem('userToken')
  return stateLS ? JSON.parce(stateLS) : initialState
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action) {
      state = action.payload
      localStorage.setItem('user', action.payload)
      // const stateLS = localStorage.getItem('userToken')
      // return stateLS ? JSON.stringify(stateLS) : state
    },
  },
})

export const {
  addUser,
} = userSlice.actions

export default userSlice.reducer
