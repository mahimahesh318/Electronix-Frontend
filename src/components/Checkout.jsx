import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Checkout = () => {
  const { cart, userAddress,url,user,clearCart } = useContext(AppContext); 
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  // console.log(userAddress);




  useEffect(() => {
    let totalQty = 0;
    let totalPrice = 0;
    if (cart?.items) {
      cart.items.forEach((item) => {
        totalQty += item.qty;
        totalPrice += item.price;
      });
    }
    setQty(totalQty);
    setPrice(totalPrice);
  }, [cart]);


  const handlePayment = async () => {
  try {
    const orderResponse = await axios.post(`${url}/payment/checkout`, {
      amount: Math.round(price),
      qty,
      cartItems: cart?.items,
      userShipping: userAddress,
      userId: user?._id,
    }, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    
    const { orderId, amount } = orderResponse.data;

    const options = {
      key: 'rzp_test_3Um1PadTKI0llf', // Your Razorpay key
      amount: amount, // in paise
      currency: 'INR',
      name: 'Electronix',
      description: 'Test Transaction',
      order_id: orderId,
      prefill: {
        name: user?.name || 'Customer',
        email: user?.email || 'customer@example.com',
        contact: user?.phone || '9999999999'
      },
      theme: { color: '#F37254' },
      handler: async (response) => {
        const paymentData = {
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
          amount: amount,
          orderItems: cart?.items,
          userId: user._id,
          userShipping: userAddress
        };

        const verifyResponse = await axios.post(`${url}/payment/verify-payment`, paymentData);
        if (verifyResponse.data.success) {
          clearCart();
          navigate('/orderconfirmation');
        } else {
          alert('Payment verification failed.');
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (error) {
    console.error('Payment error:', error);
  }
};


//   const handlePayment = async () =>{
//     console.log(url);
//     console.log("Sending to backend:", {
//   amount: price,
//   cartItems: cart?.items,
//   userShipping: userAddress,
//   userId: user?._id
// });
//     try{
//       const orderResponse = await axios.post(`${url}/payment/checkout`,{
        
//         amount : Math.round(price),
//         qty : qty,
//         cartItems : cart?.items,
//         userShipping : userAddress,
//         userId : user._id
//       }, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       withCredentials: true,
//     });

//       console.log("order response : ",orderResponse);

//       const {orderId,amount : orderAmount} = orderResponse.data;

//       const options = {
//         key: 'rzp_test_3Um1PadTKI0llf', // Replace with your Razorpay key_id
//         amount: orderAmount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//         currency: 'INR',
//         name: 'Electronix',
//         description: 'Test Transaction',
//         order_id: orderId, // This is the order_id created in the backend
//         handler : async function (response) {
//           const paymentData = {
//             orderId : response.razorpay_order_id,
//             paymentId : response.razorpay_payment_id,
//             signature : response.razorpay_signature,
//             amount : orderAmount,
//             orderItems : cart?.items,
//             userShipping : userAddress
//           }

//           const api = await axios.post(`${url}/payment/verify-payment`,paymentData);
//         },
//         callback_url: 'http://localhost:3000/payment-success', // Your success URL
//         prefill: {
//           name: 'Gaurav Kumar',
//           email: 'gaurav@example.com',
//           contact: '9999999999'
//         },
//         theme: {
//           color: '#F37254'
//         },
//       };

//       const rzp = new Razorpay(options);
//       rzp.open();

//       if(api.data.success){
//         navigate('/orderconfirmation');
//       }

      

//     } catch(error){
//       console.log(error);
//     }
//   }

  return (
    <div className="container py-5" style={{ backgroundColor: "#111", minHeight: "100vh" }}>
      <h2 className="text-center text-white mb-4">🧾 Order Summary</h2>

      {cart?.items?.length === 0 ? (
        <div className="text-center text-light">
          <h3>Your cart is empty. Add items to view order summary.</h3>
        </div>
      ) : (
        <div className="row g-4">
          {/* Left: Order Table */}
          <div className="col-lg-8">
            <div className="table-responsive bg-dark p-4 rounded shadow border border-secondary">
              <table className="table table-dark table-hover align-middle text-center">
                <thead style={{ backgroundColor: "#222" }} className="text-warning">
                  <tr>
                    <th>Image</th>
                    <th>Product Title</th>
                    <th>Quantity</th>
                    <th>Price (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map((item) => (
                    <tr key={item.productId}>
                      <td>
                        <img
                          src={item.imgSrc}
                          alt={item.title}
                          width="60"
                          height="60"
                          className="rounded"
                        />
                      </td>
                      <td className="text-white">{item.title}</td>
                      <td className="text-white">{item.qty}</td>
                      <td className="text-white">
                        <strong style={{ fontSize: "1.2rem" }}>₹ {item.price}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="d-flex justify-content-between align-items-center mt-4">
                <h5 className="text-light">
                  Total Items: <span className="badge bg-info text-dark fs-6">{qty}</span>
                </h5>
                <h5 className="text-light">
                  Total Price:{" "}
                  <span className="badge text-dark fs-5" style={{ backgroundColor: "#ffde00" }}>
                    ₹ {price.toLocaleString()}
                  </span>
                </h5>
              </div>
            </div>
          </div>

          {/* Right: Shipping Address from Context */}
          <div className="col-lg-4">
            <div className="bg-dark text-light p-4 rounded shadow border border-secondary">
              <h5 className="mb-3 text-warning">📦 Shipping Address</h5>
              {userAddress ? (
                <>
                  <p><strong>Name:</strong> {userAddress?.fullName}</p>
                  <p><strong>Phone:</strong> {userAddress?.phoneNumber}</p>
                  <p><strong>Country:</strong> {userAddress?.country}</p>
                  {/* <p><strong>State:</strong> {userAddress?.state}</p> */}
                  <p><strong>City:</strong> {userAddress?.city}</p>
                  <p><strong>PinCode:</strong> {userAddress?.pincode}</p>
                  <p><strong>Address:</strong> {userAddress?.address}</p>
                </>
              ) : (
                <p>No address found. <button onClick={() => navigate("/address")} className="btn btn-sm btn-warning mt-2">Add Address</button></p>
              )}
            </div>
          </div>

          {/* Bottom: Proceed to Pay */}
          <div className="text-center mt-5">
            <button
              className="btn btn-lg px-5"
              style={{
                backgroundColor: "#ffde00",
                color: "#111",
                fontWeight: "bold",
                fontSize: "18px",
              }}
              onClick={handlePayment}
            >
              💳 Proceed To Pay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
