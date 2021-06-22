import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts } from "../actions/productActions";

const HomeScreen = ({match}) => {
const keyword = match.params.keyword;

  //to dispatch listProducts action
  //using hooks
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  //part of the state that could be sent down
  const { loading, error, products } = productList;

  //makes a request to backend to request products
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  //const products = [];

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} x={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
