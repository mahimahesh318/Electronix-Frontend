// import React, { useContext, useState } from "react";
// import AppContext from "../../context/AppContext";
// import { useEffect } from "react";
// import { Link } from "react-router-dom";

// const RelatedProduct = ({ category }) => {
//   const { products } = useContext(AppContext);
//   const [realtedProduct, setRealtedProduct] = useState([]);
//   useEffect(() => {
//     setRealtedProduct(
//       products.filter(
//         (data) => data?.category?.toLowerCase() == category?.toLowerCase()
//       )
//     );
//   }, [category, products]);

//   return (
//     <>
//       <div className="container text-center">
//         <h1>Related Product</h1>
//         <div className="container  d-flex justify-content-center align-items-center">
//           <div className="row container d-flex justify-content-center align-items-center my-5">
//             {realtedProduct?.map((product) => (
//               <div
//                 key={product._id}
//                 className="my-3 col-md-4 
//             d-flex justify-content-center align-items-center"
//               >
//                 <div
//                   className="card bg-dark text-light text-center"
//                   style={{ width: "18rem" }}
//                 >
//                   <Link
//                     to={`/product/${product._id}`}
//                     className="d-flex justify-content-center align-items-center p-3"
//                   >
//                     <img
//                       src={product.imgSrc}
//                       className="card-img-top"
//                       alt="..."
//                       style={{
//                         width: "200px",
//                         height: "200px",
//                         borderRadius: "10px",
//                         border: "2px solid yellow",
//                       }}
//                     />
//                   </Link>
//                   <div className="card-body">
//                     <h5 className="card-title">{product.title}</h5>
//                     <div className="my-3">
//                       <button className="btn btn-primary mx-3">
//                        ₹ {product.price}
//                       </button>
//                       <button className="btn btn-warning">Add To Cart</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RelatedProduct;


import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

const RelatedProduct = ({ category }) => {
  const { products, addToCart } = useContext(AppContext);
  const [relatedProduct, setRelatedProduct] = useState([]);

  useEffect(() => {
    setRelatedProduct(
      products.filter(
        (data) => data?.category?.toLowerCase() === category?.toLowerCase()
      )
    );
  }, [category, products]);

  return (
    <>
      <div className="container text-center">
        <h1>Related Products</h1>
        <div className="container d-flex justify-content-center align-items-center">
          <div className="row container d-flex justify-content-center align-items-center my-5">
            {relatedProduct?.map((product) => (
              <div
                key={product._id}
                className="my-3 col-md-4 d-flex justify-content-center align-items-center"
              >
                <div
                  className="card bg-dark text-light text-center"
                  style={{ width: "18rem" }}
                >
                  <div className="d-flex justify-content-center align-items-center p-3">
                    {/* Only Image is Clickable */}
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={product.imgSrc}
                        className="card-img-top"
                        alt={product.title}
                        style={{
                          width: "200px",
                          height: "200px",
                          borderRadius: "10px",
                          border: "2px solid yellow",
                        }}
                      />
                    </Link>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <div className="my-3">
                      <button className="btn btn-primary mx-3">
                        ₹ {product.price}
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() =>
                          addToCart(
                            product._id,
                            product.title,
                            product.price,
                            1,
                            product.imgSrc
                          )
                        }
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RelatedProduct;
