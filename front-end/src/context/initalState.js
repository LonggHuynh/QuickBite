

const user = null
const cart = localStorage.getItem("cart")



export const initialState = {
  user,
  cart: cart || []
};
