import React, { useEffect } from "react";
// useEffect hook - where we actually wanna dispatch add to cart
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";
import { productDetailsReducer } from "../reducers/productReducers";

const CartScreen = ({ match, location, history }) => {
  //getting productId from the URL
  const productId = match.params.id;
  //if quantity parameter is in URL, we get a value, else the quantity will be 1
  const quantity = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      //both are taken from the URL
      dispatch(addToCart(productId, quantity));
    }
  }, [dispatch, productId, quantity]);

  const removeFromCartHandler = (id) => {
      console.log('remove');
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {/*useSelector hook was used to get items from the state*/}
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={quantity}
                      onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                    >
                      {
                        //loads the list of possible quantity in stock
                        [...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))
                      }
                      ;
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                      <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                          <i className='fas fa-trash'/>
                      </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={2}></Col>
      <Col md={2}></Col>
    </Row>
  );
};

export default CartScreen;
