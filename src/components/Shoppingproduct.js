import { Button, Select, Row, Col } from "antd";
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../store";
import { CartIcon } from "./Icons";
import { cartItemAdd, cartItemRemove, setProductDetail } from "../actions";
const { Option } = Select;

export default function Shoppingproduct() {
  const {
    state: { cartItems },
    dispatch,
  } = useContext(StoreContext);
  const getTotalPrice = () => {
    return cartItems.length > 0
      ? cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
      : 0;
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Row gutter={[32,32]}>
      {" "}
      {cartItems.length === 0 ? (
        <Col
          xs={{ span: 22, offset: 1 }}
          sm={{ span: 22, offset: 1 }}
          md={{ span: 24 }}
        >
          <div> Cart is empty </div>{" "}
        </Col>
      ) : (
        cartItems.map((item) => (
          <Col
            xs={{ span: 22, offset: 1 }}
            sm={{ span:22, offset: 1 }}
            md={{ span: 24 }}
          >
            <li key={item.id} className="cart-item">
              <Link to={`/product/${item.id}`}>
                <div
                  className="cart-image"
                  onClick={() => {
                    setProductDetail(dispatch, item.id, item.qty);
                  }}
                >
                  <img src={item.image} alt={item.name} />{" "}
                </div>{" "}
              </Link>{" "}
              <div className="cart-item-content">
                <div className="cart-name"> {item.name} </div>{" "}
                <div className="product-qty">
                  Qty: {"   "}{" "}
                  <Select
                    defaultValue={item.qty}
                    value={item.qty}
                    className="select-style"
                    onChange={(qty) => cartItemAdd(dispatch, item, qty)}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <Option key={x + 1} value={x + 1}>
                        {" "}
                        {x + 1}{" "}
                      </Option>
                    ))}{" "}
                  </Select>{" "}
                </div>{" "}
              </div>{" "}
              <div className="cart-item-end">
                <div className="cart-price"> $ {item.price * item.qty} </div>{" "}
                <div
                  className="cart-item-delete"
                  onClick={() => cartItemRemove(dispatch, item.id)}
                >
                  x{" "}
                </div>{" "}
              </div>{" "}
            </li>{" "}
          </Col>
        ))
      )}{" "}
      <Col
        xs={{ span: 22, offset: 1 }}
        sm={{ span: 22, offset: 1 }}
        md={{ span: 24 }}
      >
        <div className="cart-total-price-wrap">
          Total <div className="cart-total-price"> $ {getTotalPrice()} </div>{" "}
        </div>{" "}
        <Button className="cart-btn" type="primary">
          <CartIcon size={20} />{" "}
          <span style={{ marginLeft: 12 }}> Start Checkout </span>{" "}
        </Button>{" "}
      </Col>{" "}
    </Row>
  );
}
