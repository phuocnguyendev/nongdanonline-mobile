import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    farmID: null,
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { item } = action.payload

      if (!item || !item.id) {
        console.error('Invalid item provided to addToCart action:', item)
        return
      }

      const uniqueIdentifier = `${item.id}-${item.type}-${item.farmID}`
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.uniqueIdentifier === uniqueIdentifier,
      )

      if (!state.farmID) {
        state.farmID = item.farmID
      }

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.cartItems.push({
          ...item,
          uniqueIdentifier,
          quantity: 1,
          quantityMonth: item.type === 'block' ? 1 : undefined,
        })
      }

      // Recalculate total price
      state.totalPrice = state.cartItems.reduce((total, cartItem) => {
        const itemTotal =
          cartItem.price *
          cartItem.quantity *
          (cartItem.type === 'block' ? cartItem.quantityMonth || 1 : 1)
        return total + itemTotal
      }, 0)
    },

    removeFromCart: (state, action) => {
      const uniqueIdentifier = action.payload

      state.cartItems = state.cartItems.filter(
        (item) => item.uniqueIdentifier !== uniqueIdentifier,
      )

      if (state.cartItems.length === 0) {
        state.farmID = null
      }

      // Recalculate totalPrice
      state.totalPrice = state.cartItems.reduce((total, cartItem) => {
        const itemTotal =
          cartItem.price *
          cartItem.quantity *
          (cartItem.type === 'block' ? cartItem.quantityMonth || 1 : 1)
        return total + itemTotal
      }, 0)
    },
    incrementQuantity: (state, action) => {
      const uniqueIdentifier = action.payload

      const item = state.cartItems.find(
        (item) => item.uniqueIdentifier === uniqueIdentifier,
      )

      if (item) {
        item.quantity += 1
      }

      // Recalculate totalPrice
      state.totalPrice = state.cartItems.reduce((total, cartItem) => {
        const itemTotal =
          cartItem.price *
          cartItem.quantity *
          (cartItem.type === 'block' ? cartItem.quantityMonth || 1 : 1)
        return total + itemTotal
      }, 0)
    },
    decrementQuantity: (state, action) => {
      const uniqueIdentifier = action.payload

      const item = state.cartItems.find(
        (item) => item.uniqueIdentifier === uniqueIdentifier,
      )

      if (item && item.quantity > 1) {
        item.quantity -= 1
      }

      // Recalculate totalPrice
      state.totalPrice = state.cartItems.reduce((total, cartItem) => {
        const itemTotal =
          cartItem.price *
          cartItem.quantity *
          (cartItem.type === 'block' ? cartItem.quantityMonth || 1 : 1)
        return total + itemTotal
      }, 0)
    },
    incrementQuantityMonth: (state, action) => {
      const uniqueIdentifier = action.payload

      const item = state.cartItems.find(
        (cartItem) => cartItem.uniqueIdentifier === uniqueIdentifier,
      )

      if (item && item.type === 'block') {
        item.quantityMonth += 1
      }

      // Recalculate total price
      state.totalPrice = state.cartItems.reduce((total, cartItem) => {
        const itemTotal =
          cartItem.price *
          cartItem.quantity *
          (cartItem.type === 'block' ? cartItem.quantityMonth || 1 : 1)
        return total + itemTotal
      }, 0)
    },

    decrementQuantityMonth: (state, action) => {
      const uniqueIdentifier = action.payload

      const item = state.cartItems.find(
        (cartItem) => cartItem.uniqueIdentifier === uniqueIdentifier,
      )

      if (item && item.type === 'block' && item.quantityMonth > 1) {
        item.quantityMonth -= 1
      }

      // Recalculate total price
      state.totalPrice = state.cartItems.reduce((total, cartItem) => {
        const itemTotal =
          cartItem.price *
          cartItem.quantity *
          (cartItem.type === 'block' ? cartItem.quantityMonth || 1 : 1)
        return total + itemTotal
      }, 0)
    },

    clearCart: (state) => {
      state.cartItems = []
      state.farmID = null
      state.totalPrice = 0 // Reset totalPrice
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  incrementQuantityMonth,
  decrementQuantityMonth,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer
