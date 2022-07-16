import { createSlice } from "@reduxjs/toolkit"
import { current } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: {
    userAuth: null,
    userFireDoc: null,
  },
  reducers: {
    login: (state, action) => {
      state.userAuth = action.payload
    },
    logout: state => {
      state.userAuth = null
    },
    userFireDoc: (state, action) => {
      state.userFireDoc = action.payload
    },
    addPtoRequest: (state, action) => {
      if (state.userFireDoc.pto) {
        state.userFireDoc.pto = {
          ...state.userFireDoc.pto,
          submitted: state.userFireDoc.pto.submitted
            ? [...state.userFireDoc.pto.submitted, action.payload.request]
            : [action.payload.request],
        }
      } else {
        state.userFireDoc = {
          ...state.userFireDoc,
          pto: {
            submitted: [action.payload.request],
          },
        }
      }
    },
  },

  // This one is honestly more trouble than it's worth for now.
  // The removed logic was causing a bug that would only allow
  // an admin to handlePto if the admin's own userFireDoc had
  // a PTO submission of its own..
  extraReducers: {
    "users/approvePtoRequest": (state, action) => {
      console.log("IMMER:", current(state).userFireDoc)
      console.log("userPTO:", state.userFireDoc)
      console.log("action:", action.payload.request.id, action.payload.request)
    },
    "users/denyPtoRequest": (state, action) => {},
  },
})

export const { login, logout, userFireDoc, addPtoRequest } = userSlice.actions

// Selectors
export const selectUserAuth = state => state.user.userAuth
export const selectUserFireDoc = state => state.user.userFireDoc

export default userSlice.reducer
