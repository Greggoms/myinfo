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
    // https://stackoverflow.com/questions/67577835/same-action-triggering-in-multiple-slices-redux-toolkit
    // slideshowp2 answer
    // This allows for 1 action (modifyUser) to update
    // 2 slice state values (this user.value & usersSlice's users.value)
  },
  extraReducers: {
    "users/managePtoRequest": (state, action) => {
      state.userFireDoc.submitted = state.userFireDoc.submitted.filter(
        request => request.id !== action.payload.request.id
      )
      state.userFireDoc.pending = state.userFireDoc.pending
        ? [...state.userFireDoc.pending, action.payload.request]
        : [action.payload.request]
    },
  },
})

export const { login, logout, userFireDoc, addPtoRequest, approvePtoRequest } =
  userSlice.actions

// Selectors
export const selectUser = state => state.user.user
export const selectUserFireDoc = state => state.user.userFireDoc

export default userSlice.reducer
