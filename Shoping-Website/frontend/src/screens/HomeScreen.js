import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { listProducts } from '../actions/product-actions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Product from '../components/Product';
import { Link, useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import { Helmet } from 'react-helmet';

const HomeScreen = () => {
  const dispatch = useDispatch();
  //use effects loads as soon as the component loads
  const params = useParams();
  const keyword = params.keyword;

  const pageNumber = params.pageNumber || 1;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Helmet>
        <title>Welcome To Shop A-Z | Home</title>
      </Helmet>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-dark">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{Message}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}></Product>
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
