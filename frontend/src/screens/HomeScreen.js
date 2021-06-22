import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import { listProducts } from "../actions/productActions";

const HomeScreen = ({match}) => {
const keyword = match.params.keyword;
const pageNumber = match.params.pageNumber || 1;

  //to dispatch listProducts action
  //using hooks
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  //part of the state that could be sent down
  const { loading, error, products, page, pages } = productList;

  //makes a request to backend to request products
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword, pageNumber]);

  //const products = [];

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <Paginate
          pages={pages}
          page={page}
          keyword={keyword ? keyword : ''}
        />
      </>
      )}
    </>
  );
};

export default HomeScreen;
