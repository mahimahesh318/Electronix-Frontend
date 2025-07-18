// import React, { useState, useEffect, useContext } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import RelatedProduct from "./RelatedProduct";

// const ProductDetail = () => {
//   const [product, setProduct] = useState();
//   const { id } = useParams();
//   const url = "http://localhost:3000/api";

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const api = await axios.get(`${url}/product/${id}`, {
//         headers: {
//           "Content-Type": "Application/json",
//         },
//         withCredentials: true,
//       });
//       console.log(api.data.products);
//       // setProduct(api.data.product)
//       //whenever you feel stuck just go to to url and write console.log and the objects will be visibled from there you can solve your errors.
//       setProduct(api.data.products);
//     };
//     fetchProduct();
//   }, [id]);
//   return (
//     <>
//       <div
//         className="container text-center my-5"
//         style={{
//           display: "flex",
//           justifyContent: "space-evenly",
//           alignItems: "center",
//         }}
//       >
//         <div className="left">
//           <img
//             src={product?.imgSrc}
//             alt=""
//             style={{
//               width: "250px",
//               height: "250px",
//               borderRadius: "10px",
//               border: "2px solid yellow",
//             }}
//           />
//         </div>
//         <div className="right">
//           <h1>{product?.title}</h1>
//           <p>{product?.description}</p>
//           <h1> ₹{product?.price}</h1>
//           {/* <h3>{product?.category}</h3> */}
//           <div className="my-5">
//             <button
//               className="btn btn-danger mx-3"
//               style={{ fontWeight: "bold" }}
//             >
//               Buy Now
//             </button>
//             <button className="btn btn-warning" style={{ fontWeight: "bold" }}>
//               Add To Cart
//             </button>
//           </div>
//         </div>
//       </div>
//       <RelatedProduct category={product?.category} />
//     </>
//   );
// };

// export default ProductDetail;


import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import RelatedProduct from "./RelatedProduct";
import AppContext from "../../context/AppContext"; // import context

const ProductDetail = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();
  // const url = "http://localhost:3000/api";
  const { addToCart,url } = useContext(AppContext); // use context
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      setProduct(api.data.products);
    };
    fetchProduct();
  }, [id]);

  return (
    <>
      <div
        className="container text-center my-5"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div className="left">
          <img
            src={product?.imgSrc}
            alt=""
            style={{
              width: "250px",
              height: "250px",
              borderRadius: "10px",
              border: "2px solid yellow",
            }}
          />
        </div>
        <div className="right">
          <h1>{product?.title}</h1>
          <p>{product?.description}</p>
          <h1> ₹{product?.price}</h1>

          <div className="my-5">
            <button
              className="btn btn-danger mx-3"
              style={{ fontWeight: "bold" }}
              onClick={() => {
                addToCart(product._id, product.title, product.price, 1, product.imgSrc);
                setTimeout(() => {
                  navigate("/shipping");
                }, 500);
              }}
            >
              Buy Now
            </button>
            <button
              className="btn btn-warning"
              style={{ fontWeight: "bold" }}
              onClick={() =>
                addToCart(product._id, product.title, product.price, 1, product.imgSrc)
              }
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      <RelatedProduct category={product?.category} />
    </>
  );
};

export default ProductDetail;
