import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

const ShowProduct = () => {
  const { products,filterData,addToCart } = useContext(AppContext);
  
  return (
    <div className="container  d-flex justify-content-center align-items-center" >
      <div className="row container d-flex justify-content-center align-items-center my-5">
        {filterData.map((product) => (
          <div key={product._id} className="my-3 col-md-4 
            d-flex justify-content-center align-items-center">
            <div className="card bg-dark text-light text-center" style={{ width: "18rem" }}>
              <Link to={`/product/${product._id}`} className="d-flex justify-content-center align-items-center p-3">
                <img
                  src={product.imgSrc}
                  className="card-img-top"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "10px",
                    // border: "2px solid yellow",
                  }}
                  alt="product-img"
                />
              </Link>
              <div className="card-body text-center">
                <h3 className="card-title mb-3">{product.title}</h3>
                <div className="d-flex justify-content-around mb-1">
                <button className="btn btn-primary btn-sm" style={{fontWeight : "bold"}}>₹ {product.price}</button>
                <button className="btn btn-warning btn-sm" onClick={()=>addToCart(product._id, product.title, product.price, 1, product.imgSrc)} style={{fontWeight : "bold"}}>Add To Cart</button>
                </div>
               
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowProduct;


