import { createSlice } from "@reduxjs/toolkit"

const initialState = { value: [] }

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    gatherUsers: (state, action) => {
      state.value = action.payload
    },
    deleteUser: (state, action) => {
      state.value = state.value.filter(user => user.id !== action.payload)
    },
    modifyUser: (state, action) => {
      // 1) Locate the person I'm trying to edit
      // eslint-disable-next-line
      const user = state.value.find(person => person.id === action.payload.id)

      // 2) Find the index of that person in the store/state.
      const index = state.value.indexOf(user)

      // 3) If there is a match, replace that array item with the new one.
      // https://stackoverflow.com/questions/5915789/how-to-replace-item-in-array
      // Eli answer
      // EXTRA STEP ADDED:
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
      //// { ...state.value[index], ...action.payload }
      //// This merges the existing values with the new ones.
      if (index !== -1) {
        state.value[index] = { ...state.value[index], ...action.payload }
      }
      console.log(action.payload.name, "has been updated!")
    },
    approvePtoRequest: (state, action) => {
      const user = state.value.find(person => person.id === action.payload.id)
      user.pto.submitted = user.pto.submitted.filter(
        request => request.id !== action.payload.request.id
      )
      user.pto.pending = user.pto.pending
        ? [...user.pto.pending, action.payload.request]
        : [action.payload.request]
    },
    denyPtoRequest: (state, action) => {
      const user = state.value.find(person => person.id === action.payload.id)
      user.pto.submitted = user.pto.submitted.filter(
        request => request.id !== action.payload.request.id
      )
      user.pto.denied = user.pto.denied
        ? [...user.pto.denied, action.payload.request]
        : [action.payload.request]
    },
  },
  extraReducers: {
    "user/addPtoRequest": (state, action) => {
      const user = state.value.find(person => person.id === action.payload.id)
      const index = state.value.indexOf(user)
      if (index !== -1) {
        if (state.value[index].pto) {
          state.value[index].pto.submitted = [
            ...state.value[index].pto.submitted,
            action.payload.request,
          ]
        } else {
          state.value[index] = {
            ...state.value[index],
            pto: {
              submitted: [action.payload.request],
            },
          }
        }
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  gatherUsers,
  deleteUser,
  modifyUser,
  approvePtoRequest,
  denyPtoRequest,
} = usersSlice.actions

// Selectors
export const selectUsers = state => state.users.value

export default usersSlice.reducer
