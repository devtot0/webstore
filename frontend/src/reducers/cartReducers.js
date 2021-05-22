import { CART_ADD_ITEM } from "../constants/cartConstants";
import { addToCart } from '../actions/cartActions';

let initialState = {cartItems: []};
export const cartReducer = (state = { cartItems: [] }, action) => {
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload;
            //we check if the item exists in state
            const existItem = state.cartItems.find(x => x.product === item.product);
            
            if(existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x),
                }
            } else {
                return {
                    ...state,
                    cartItems : [...state.cartItems, item],
                }
            }
        default:
            return state;
    }
};