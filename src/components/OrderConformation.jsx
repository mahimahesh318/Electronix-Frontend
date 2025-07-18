import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import ShowOrderProduct from "./ShowOrderProduct";

const OrderConformation = () => {
  const { userOrder } = useContext(AppContext);
  const [latestOrder, setLatestOrder] = useState({});
  useEffect(() => {
    if (userOrder) {
      setLatestOrder(userOrder[0]);
    }
  }, [userOrder]);

  console.log("latestOrder", latestOrder);

  return (
    <>
      <div className="container my-5">
        <h2 className="text-center">✅ Order Confirmed.</h2>
        <h3 className="text-center">It will be delivered soon...</h3>
      </div>

      <div className="container">
        <table className="table table-bordered border-primary bg-dark">
          <thead className="bg-dark">
            <tr>
              <th scope="col" className="bg-dark text-light text-center">
                OrderItems
              </th>

              <th scope="col" className="bg-dark text-light text-center">
                OrderDetails & ShippingAddress
              </th>
            </tr>
          </thead>
          <tbody className="bg-dark">
            <tr>
              <td className="bg-dark text-light">
                {/* <TableProduct cart={cart} /> */}
                <ShowOrderProduct items={latestOrder?.orderItems} />
              </td>
              <td className="bg-dark text-light">
                <ul style={{ fontWeight: "bold" }}>
                  <li>OrderId : {latestOrder?.orderId}</li>
                  <li>PaymentId : {latestOrder?.paymentId}</li>
                  <li>PaymentStatus : {latestOrder?.payStatus}</li>
                  <li>Name : {latestOrder?.userShipping?.fullName}</li>
                  <li>Phone : {latestOrder?.userShipping?.phoneNumber}</li>
                  <li>Country : {latestOrder?.userShipping?.country}</li>
                  {/* <li>State : {latestOrder?.userShipping?.state}</li> */}
                  <li>PinCode : {latestOrder?.userShipping?.pincode}</li>
                  <li>Address : {latestOrder?.userShipping?.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderConformation;