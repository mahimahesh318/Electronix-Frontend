import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';


const Nav = () => {
  const [searchTerm,setSearchTerm] = useState("");
  const navigate = useNavigate()

  const {setfilterData,products,logout,isAuthentic,cart} = useContext(AppContext);

  const filterbyCategory = (cat) => {
  console.log(products); // should log an array
  // no need to log data.category here unless you want to debug specific item
  const filteredProducts = products.filter((product) =>
    product.category.toLowerCase() === cat.toLowerCase()
  );
  console.log(filteredProducts); // check the filtered result
  setfilterData(filteredProducts);
};

  const submitHandler = (e) =>{
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
  }

    const filterbyPrice = (price) => {
    setfilterData(products.filter((data) => data.price <= price));
  };
   const filterbyPrice1 = (price) => {
    setfilterData(products.filter((data) => data.price > price));
  };


  return <>
  <div className="nav sticky-top">
    <div className="nav-bar">
      <Link to={'/'} className="left" style={{textDecoration : 'none'}}>
        <h3 className='logo'>⚡ Electronix</h3>
      </Link>
      <form className="search-bar" onSubmit={submitHandler}>
        <input type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder=' 🔍 Search Products Here'/>
      </form>
      <div className="right">
        {isAuthentic && (
          <>
          <Link to={'/cart'} type="button" className="btn btn-primary position-relative btn-sm mx-4">
  <span className="material-symbols-outlined">
shopping_cart
</span>
  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {cart?.items?.length}
    <span className="visually-hidden">unread messages</span>
  </span>
</Link>
        <Link to={'/profile'} className='btn btn-info mx-3 btn-sm' style={{fontWeight : "bold"}}>Profile</Link>
         <button className='btn btn-danger mx-3 btn-sm' onClick={()=>{logout(); navigate('/')}} style={{fontWeight : "bold"}}>Log Out</button>
          </>
        )}

        {!isAuthentic && (
          <>
           <Link to={'/login'} className='btn btn-secondary mx-3 btn-sm' style={{fontWeight : "bold"}}>Login</Link>
           <Link to={'/register'} className='btn btn-info mx-3 btn-sm' style={{fontWeight : "bold"}}>Register</Link>
          </>
        )}
        
       
       
      </div>
    </div>
    <div className="sub_bar">
      <div className="items" onClick={() => setfilterData(products)}>All Products</div>
      <div className="items" onClick={()=>filterbyCategory("mobiles")}>Mobiles</div>
      <div className="items" onClick={()=>filterbyCategory("laptops")}>Laptops</div>
      <div className="items" onClick={()=>filterbyCategory("cameras")}>Cameras</div>
      <div className="items" onClick={()=>filterbyCategory("headphones")}>Headphones</div>
      <div className="items" onClick={()=>filterbyPrice(30000)}>30000</div>
      <div className="items" onClick={()=>filterbyPrice1(30000)}>30000+</div>
    </div>
  </div>
  
  </>
}

export default Nav