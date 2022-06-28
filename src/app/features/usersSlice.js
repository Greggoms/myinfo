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
    updateUser: (state, action) => {
      const userToUpdate = state.value.find(
        user => user.id === action.payload.id
      )
      if (userToUpdate) {
        console.log(action.payload.info)
      }
      // state.value = [action.payload, ...state.value]
    },
  },
})

// Action creators are generated for each case reducer function
export const { gatherUsers, deleteUser, updateUser } = usersSlice.actions

// Selectors
export const selectUsers = state => state.users.value

export default usersSlice.reducer
