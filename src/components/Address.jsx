// import React, { useContext } from "react";
// import { useState } from "react";
// import AppContext from "../context/AppContext";
// import { useNavigate } from "react-router-dom";

// const Address = () => {
//   const { shippingAddress, userAddress } = useContext(AppContext);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: "",
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//      pincode: "",
//     phoneNumber: "",
//   });
//   const onChangerHandler = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
//   const { fullName, address, city, state, country, pincode, phoneNumber } =
//     formData;
//   const submitHandler = async (e) => {
//     e.preventDefault();
//     alert("Your form has been submited")
// uu
//     const result = await shippingAddress(
//       fullName,
//       address,
//       city,
//       state,
//       country,
//       pincode,
//       phoneNumber
//     );

//     // console.log("address adedd ",result)

//     if (result.success) {
//       navigate("/checkout");
//     }

//     setFormData({
//       fullName: "",
//       address: "",
//       city: "",
//       state: "",
//       country: "",
//       pincode: "",
//       phoneNumber: "",
//     });

//     // console.log(formData);
//   };


//   return (
//     <div className="container mt-5 mb-5" style={{ border: '2px solid white', padding: '50px', borderRadius : '20px'}}>
//       <h1 className='text-center mb-5'>Shipping Address</h1>
//       <form className="row g-3" onSubmit={submitHandler}>
//         {/* Full Name */}
//         <div className="col-md-6">
//           <label htmlFor="inputName" className="form-label">Full Name</label>
//           <input  onChange={onChangerHandler} type="text" name='fullName' className="form-control  bg-dark text-light" id="inputName" />
//         </div>

//         {/* Country */}
//         <div className="col-md-6">
//           <label htmlFor="inputCountry" className="form-label">Country</label>
//           <input  onChange={onChangerHandler} type="text" name='country' className="form-control  bg-dark text-light" id="inputCountry" />
//         </div>

//         {/* Address */}
//         <div className="col-12">
//           <label htmlFor="inputAddress" className="form-label">Address</label>
//           <input  onChange={onChangerHandler} type="text" name='address' className="form-control  bg-dark text-light" id="inputAddress" placeholder="1234 Main St" />
//         </div>

//         {/* State */}
//         <div className="col-md-6">
//           <label htmlFor="inputState" className="form-label">State</label>
//           <input  onChange={onChangerHandler} type="text" name='state' className="form-control  bg-dark text-light" id="inputState" />
//         </div>

//         {/* City */}
//         <div className="col-md-6">
//           <label htmlFor="inputCity" className="form-label">City</label>
//           <input  onChange={onChangerHandler} type="text" name='city' className="form-control  bg-dark text-light" id="inputCity" />
//         </div>

//         {/* Pincode */}
//         <div className="col-md-6">
//           <label htmlFor="inputZip" className="form-label">Pincode</label>
//           <input  onChange={onChangerHandler} type="text" name='pincode' className="form-control  bg-dark text-light" id="inputZip" />
//         </div>

//          {/* Phonenumber */}
//         <div className="col-md-6">
//           <label htmlFor="inputPhone" className="form-label">Phone Number</label>
//           <input  onChange={onChangerHandler} type="tel" name='phoneNumber' className="form-control  bg-dark text-light" id="inputPhone" />
//         </div>

//         {/* Buttons */}
//         <div className="col-12 d-flex justify-content-center gap-3 mt-5">
//           <button type="submit" className="btn btn-primary">Submit</button>
//           <button type="button" className="btn btn-secondary">Use Old Address</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Address;

import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const { shippingAddress ,userAddress} = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });

  const onChangerHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { fullName, address, city, state, country, pincode, phoneNumber } = formData;

  const submitHandler = async (e) => {
    e.preventDefault();
    // alert("Your form has been submitted");

    try {
      const result = await shippingAddress(
        fullName,
        address,
        city,
        state,
        country,
        pincode,
        phoneNumber
      );

      // Check if API response indicates success
      if (result && result.success) {
        navigate("/checkout");
      } else {
        // Handle failure case if needed
        alert("Failed to save address");
      }
    } catch (error) {
      console.error("Error submitting address:", error);
      alert("An error occurred. Please try again.");
    }

    // Reset form after submission
    setFormData({
      fullName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber: "",
    });
  };

  return (
    <div
      className="container mt-5 mb-5"
      style={{
        border: "2px solid white",
        padding: "50px",
        borderRadius: "20px",
      }}
    >
      <h1 className="text-center mb-5">Shipping Address</h1>
      <form className="row g-3" onSubmit={submitHandler}>
        {/* Full Name */}
        <div className="col-md-6">
          <label htmlFor="inputName" className="form-label">
            Full Name
          </label>
          <input
            onChange={onChangerHandler}
            value={fullName}
            type="text"
            name="fullName"
            className="form-control bg-dark text-light"
            id="inputName"
            required
          />
        </div>

        {/* Country */}
        <div className="col-md-6">
          <label htmlFor="inputCountry" className="form-label">
            Country
          </label>
          <input
            onChange={onChangerHandler}
            value={country}
            type="text"
            name="country"
            className="form-control bg-dark text-light"
            id="inputCountry"
            required
          />
        </div>

        {/* Address */}
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            onChange={onChangerHandler}
            value={address}
            type="text"
            name="address"
            className="form-control bg-dark text-light"
            id="inputAddress"
            placeholder="1234 Main St"
            required
          />
        </div>

        {/* State */}
        <div className="col-md-6">
          <label htmlFor="inputState" className="form-label">
            State
          </label>
          <input
            onChange={onChangerHandler}
            value={state}
            type="text"
            name="state"
            className="form-control bg-dark text-light"
            id="inputState"
            required
          />
        </div>

        {/* City */}
        <div className="col-md-6">
          <label htmlFor="inputCity" className="form-label">
            City
          </label>
          <input
            onChange={onChangerHandler}
            value={city}
            type="text"
            name="city"
            className="form-control bg-dark text-light"
            id="inputCity"
            required
          />
        </div>

        {/* Pincode */}
        <div className="col-md-6">
          <label htmlFor="inputZip" className="form-label">
            Pincode
          </label>
          <input
            onChange={onChangerHandler}
            value={pincode}
            type="text"
            name="pincode"
            className="form-control bg-dark text-light"
            id="inputZip"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="col-md-6">
          <label htmlFor="inputPhone" className="form-label">
            Phone Number
          </label>
          <input
            onChange={onChangerHandler}
            value={phoneNumber}
            type="tel"
            name="phoneNumber"
            className="form-control bg-dark text-light"
            id="inputPhone"
            required
          />
        </div>

        {/* Buttons */}
        <div className="col-12 d-flex justify-content-center gap-3 mt-5">
          <button type="submit" className="btn btn-primary" style={{fontWeight : "bold"}}>
            Submit
          </button>
          {userAddress && (
             <button type="button" className="btn btn-secondary" onClick={()=>navigate('/checkout')} style={{fontWeight : "bold"}}>
            Use Old Address
          </button>
          )}
         
        </div>
      </form>
    </div>
  );
};

export default Address;