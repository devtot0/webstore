import React, { useEffect } from "react";
// useEffect hook - where we actually wanna dispatch add to cart
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";
import { productDetailsReducer } from "../reducers/productReducers";

const CartScreen = ({ match, location, history }) => {
    //getting productId from the URL
  const productId = match.params.id;
  //if quantity parameter is in URL, we get a value, else the quantity will be 1
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if(productId){
        //both are taken from the URL
        dispatch(addToCart(productId, quantity));
    }
  }, [dispatch, productId, quantity]);

  return <div>Cart</div>;
};

export default CartScreen;
