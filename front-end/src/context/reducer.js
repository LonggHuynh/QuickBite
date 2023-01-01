import {combineReducers} from 'redux'

export const actionType = {
  SET_USER: "SET_USER",
  SET_CART: "SET_CART",
};


const userReducer =  (state= {}, action)=>{
  switch(action.type){
    case actionType.SET_USER:
      return action.payload
    default:
      return state
  }
}

const cartReducer = (state= [], action)=>{
  switch(action.type){
    case actionType.SET_CART:
      return action.payload
    default:
      return state
  }
}


const reducer = combineReducers({user: userReducer, cart: cartReducer})


export default reducer;
