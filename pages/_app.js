import '../styles/globals.css'
import React, { createContext,useReducer } from 'react'

export const CartSystem = createContext()


const initailState = {
    cart: [],
}

function MyApp({ Component, pageProps }) {

  const Reducers = (state,action)=>{

    switch(action.type){
        case 'ADD_TO_CART':
           const {id, name, price,description} = action.payload
            const cartItem = state.cart.find(item => item.id === id)
            if (cartItem) {
                return {
                    ...state,
                    cart: state.cart.map(item => item.id === id ? {...item, quantity: item.quantity + 1} : item)
                }
            } else {
                return {
                    ...state,
                    cart: [...state.cart, {id, name, price, description, quantity: 1}]
                }
            }
        default:
        return state;
    }
          
      
  }

  const [state,dispatch] = useReducer(Reducers,initailState)

  return (
    <CartSystem.Provider value={{state,dispatch}}>
      <Component {...pageProps} />
    </CartSystem.Provider>
  )
}

export default MyApp
