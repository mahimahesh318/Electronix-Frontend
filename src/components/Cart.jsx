import React, { useContext, useState, useEffect } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, decreaseQty, addToCart, removeFromCart } =
    useContext(AppContext);
  console.log(cart);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);

  // console.log(cart.items.imgSrc);
  return (
    <>
   {cart?.items.length === 0 ? (
  <div className="container text-center my-5">
    <h2>Your cart is currently empty. Start shopping now!</h2>
  </div>
) : (
  <div className="my-5 text-center">
    <button className="btn btn-info mx-3" style={{fontWeight : "bold"}}>Total Qty : {qty}</button>
    <button className="btn btn-warning mx-3" style={{fontWeight : "bold"}}>Total Price : {price}</button>
  </div>
)}
      

      {cart?.items?.map((product) => (
        <div
          key={product._id}
          className="container bg-dark my-5 p-3 text-center"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div className="cart-img">
              <img
                src={product.imgSrc}
                alt=""
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div className="cart-des">
              <h2>{product.title}</h2>
              <h3>₹ {product.price}</h3>
              {/* <h3>Qty : {product.qty}</h3> */}
            </div>
            <div
              className="cart_action"
              style={{ display: "flex", alignItems: "center" }}
            >
              <button
                className="btn btn-primary mx-3 "
                onClick={() => decreaseQty(product?.productId, 1)}
              >
                -
              </button>
              <h3 style={{ margin: "0 10px" }}>{product.qty}</h3>
              <button
                className="btn btn-primary mx-3 "
                onClick={() =>
                  addToCart(
                    product?.productId,
                    product.title,
                    product.price / product.qty,
                    1,
                    product.imgSrc
                  )
                }
              >
                +
              </button>
              <button
                className="btn btn-danger mx-3"
                onClick={() => {
                  if (confirm("Are you sure, do you want to remove from cart"))
                    removeFromCart(product?.productId);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {cart?.items.length > 0 && (
            <div className="container text-center my-5">
          <button className="btn btn-warning " onClick={()=>navigate('/shipping')} style={{fontWeight : "bold"}}>Checkout</button>
      </div>
      )}
    
    </>
  );
};

export default Cart;
