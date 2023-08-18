import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../store/auth/auth-context";
import { useNavigate } from "react-router-dom";

const Cart = (props) => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const [isOrder, setIdOrder] = useState(false);
  const { isLoading, error, RequestHandler: addNewOrder } = useFetch();
  const [isSubmitted, setIdSubmitted] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const navigate = useNavigate()

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const onSubmitToDB = (dataInput) => {
    addNewOrder(
      {
        url: "https://react-http-2e99e-default-rtdb.firebaseio.com/orders.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          user: dataInput,
          orderItems: cartCtx.items,
        },
      },
      (data) => {
        setIdSubmitted(true);
        cartCtx.clearItem();
      }
    );
  };

  let content = "";
  const orderHandler = () => {
    if (authCtx.isLoggin) {
      setIdOrder((prev) => !prev);
    } else {
      navigate("login")
    }
  };

  const isSubmitingData = <p>Sending order data....</p>;
  const didSubmitData = (
    <>
      <p>Successfully sent the order</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );
  if (isOrder) {
    content = (
      <>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        {hasItems ? (
          <Checkout
            onSubmitToDB={onSubmitToDB}
            onClose={props.onClose}
          ></Checkout>
        ) : (
          <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onClose}>
              Close
            </button>
          </div>
        )}
      </>
    );
  } else if (!isOrder) {
    content = (
      <>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      </>
    );
  }

  return (
    <Modal onClose={props.onClose}>
      {!isLoading && !isSubmitted && content}
      {isLoading && isSubmitingData}
      {!isLoading && isSubmitted && didSubmitData}
    </Modal>
  );
};

export default Cart;
