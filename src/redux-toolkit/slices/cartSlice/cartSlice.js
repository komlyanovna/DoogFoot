/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  items: [],
  checkbox: true,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
          checkbox: true,
        })
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        if (obj.discount) {
          const priceCart = obj.price - ((obj.price / obj.discount))
          return (priceCart * obj.count) + sum
        }
        return (obj.price * obj.count) + sum
      }, 0)
    },

    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload)
      findItem.count--

      state.totalPrice = state.items.reduce((sum, obj) => {
        if (obj.discount) {
          const priceCart = obj.price - ((obj.price / obj.discount))
          return (priceCart * obj.count) + sum
        }
        return (obj.price * obj.count) + sum
      }, 0)
    },

    removeItem(state, action) {
      state.items = state.items.filter((cart) => cart.id !== action.payload)
      state.totalPrice = state.items.reduce((sum, obj) => {
        if (obj.discount) {
          const priceCart = obj.price - ((obj.price / obj.discount))
          return (priceCart * obj.count) + sum
        }
        return (obj.price * obj.count) + sum
      }, 0)
    },

    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    },

    setCheckbox(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload)
      console.log(findItem.checkbox)
      if (findItem) {
        findItem.checkbox = !findItem.checkbox
      }
      findItem.checkbox
    },

    toggleCheckAll(state) {
      state.checkbox = !state.checkbox
      state.items = state.items.map((el) => ({ ...el, checkbox: !el.checkbox }))
    },
  },
})

export const {
  addItem, removeItem, minusItem, clearItems, setCheckbox, toggleCheckAll,
} = cartSlice.actions

export default cartSlice.reducer
