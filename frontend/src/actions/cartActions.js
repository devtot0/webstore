import axios from 'axios';
import { CART_ADD_ITEM } from '../constants/cartConstants';

export const addToCart = (id, quantity) => async(dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}`);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            quantity,
        }
    });
    //once dispatched, we wnt ot save an item to local storage added to cart to local storage
    //we get it in store.js 
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}