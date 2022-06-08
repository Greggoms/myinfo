import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    userFireDoc: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: state => {
      state.user = null
    },
    userFireDoc: (state, action) => {
      state.userFireDoc = action.payload
    },
  },
})

export const { login, logout, userFireDoc } = userSlice.actions

// Selectors
export const selectUser = state => state.user.user
export const selectUserFireDoc = state => state.user.userFireDoc

export default userSlice.reducer
