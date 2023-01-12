import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice/filterSlice'
import cartReducer from './slices/cartSlice/cartSlice'
import userReducer from './slices/userSlice/userSlice'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    user: userReducer,
  },
})
