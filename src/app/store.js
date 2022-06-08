import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./features/userSlice"
import usersReducer from "./features/usersSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
  },
})
