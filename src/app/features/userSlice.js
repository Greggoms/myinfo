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
    addPtoRequest: (state, action) => {
      state.userFireDoc = {
        ...state.userFireDoc,
        submitted: state.userFireDoc.submitted
          ? [...state.userFireDoc.submitted, action.payload]
          : [action.payload],
      }
    },
    approvePtoRequest: (state, action) => {
      state.userFireDoc = {
        ...state.userFireDoc,
        submitted: state.userFireDoc.submitted.filter(
          request => request !== request
        ),
        pending: state.userFireDoc.pending
          ? [...state.userFireDoc.pending, action.payload]
          : [action.payload],
      }
    },
  },
})

export const { login, logout, userFireDoc, addPtoRequest, approvePtoRequest } =
  userSlice.actions

// Selectors
export const selectUser = state => state.user.user
export const selectUserFireDoc = state => state.user.userFireDoc

export default userSlice.reducer
