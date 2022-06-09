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
  },
})

// Action creators are generated for each case reducer function
export const { gatherUsers, deleteUser } = usersSlice.actions

// Selectors
export const selectUsers = state => state.users.value

export default usersSlice.reducer
