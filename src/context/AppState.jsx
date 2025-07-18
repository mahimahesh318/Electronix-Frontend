import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
 import { ToastContainer, toast,Bounce } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

const AppState = (props) => {
  const url = "http://localhost:3000/api";
  // const url = https://electronix-0bno.onrender.com/api";


  const [products, setProducts] = useState([]);
  const [token,setToken] = useState([]);
  const [isAuthentic,setisAuthentic] = useState(false);
  const [filterData,setfilterData] = useState([]);
  const [user,setUser] = useState();
  const [cart,setCart] = useState([]);
  const [reload,setReload] =  useState(false);
  const [userAddress,setuserAddress] = useState("");
  const [userOrder,setuserOrder] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      
      setProducts(api.data.products);
      setfilterData(api.data.products);
      userProfile();
    };

    fetchProducts();
    userCart();
    getAddress();
    userOrders();
  }, [token,reload]);

  useEffect(() => {
    let lstoken = localStorage.getItem('token');
    if(lstoken){
    setToken(lstoken);
    setisAuthentic(true);
    }
   
  }, [])
  

  //register user
  const register = async (name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );
    // setProducts(api.data.products);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  };

  //login user
  const login = async (email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      {email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );
    // setProducts(api.data.products);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    setToken(api.data.token);
    setisAuthentic(true);
    localStorage.setItem('token',api.data.token);
    return api.data;
  };

//logout user
const logout = () =>{
  setisAuthentic(false)
  setToken(" ");
  localStorage.removeItem('token');
   toast.success("Logout Successfully.", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
} 

//user profile
 const userProfile = async () => {
      const api = await axios.get(`${url}/user/profile`, {
        headers: {
          "Content-Type": "Application/json",
          Auth : token,
        },
        withCredentials: true,
      });
      console.log("api data ",api.data);
      setUser(api.data.user);
     
    };

     // add To Cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    // console.log("product id = ", productId);
    const api = await axios.post(
      `${url}/cart/add`,
      { productId, title, price, qty, imgSrc },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
     console.log("my cart ",api)

    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  // user Cart
  const userCart = async () => {
    const api = await axios.get(`${url}/cart/user`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
     console.log("user cart ",api.data.cart);
    setCart(api.data.cart);
    //  setUser("user cart ",api);
  };


  //lower cart
   const decreaseQty = async (productId,qty) => {
    const api = await axios.post(`${url}/cart/--qty`, { productId, qty }, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setReload(!reload);
    console.log("decrease cart ",api);
     toast.success("Item Decreased.", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    //  console.log("user cart ",api.data.cart);
    // setCart(api.data.cart);
    //  setUser("user cart ",api);
  };

  //remove from cart
   const removeFromCart = async (productId) => {
    const api = await axios.delete(`${url}/cart/remove/${productId}`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setReload(!reload);
    console.log("decrease cart ",api);
     toast.success("Product Removed From Cart.", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    //  console.log("user cart ",api.data.cart);
    // setCart(api.data.cart);
    //  setUser("user cart ",api);
  };

  //  clear Cart
  const clearCart = async () => {
    const api = await axios.delete(`${url}/cart/clear`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setReload(!reload);
    // console.log("remove item from cart ",api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    //  setCart(api.data.cart);
    //  setUser("user cart ",api);
  };

  //shipping address
   const shippingAddress = async (fullName, address, city, state, country, pincode, phoneNumber) => {
    const api = await axios.post(`${url}/address/add`,
      {fullName, address, city, state, country, pincode, phoneNumber}, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setReload(!reload);
    // console.log("decrease cart ",api);
     toast.success("Address Saved", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
    //  console.log("user cart ",api.data.cart);
    // setCart(api.data.cart);
    //  setUser("user cart ",api);
  };

 //get previous address
  const getAddress = async () => {
    const api = await axios.get(`${url}/address/get`,
     {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
  setuserAddress(api.data.userAddress);
  }

  //get user order
  const userOrders = async () => {
    const api = await axios.get(`${url}/payment/userorder`,
     {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setuserOrder(api.data);
  }

    console.log("Fetched Orders from API:", userOrder); // ✅ Add this

  return (
    <>
      <AppContext.Provider value={{ products, register, login, url, token, setisAuthentic,isAuthentic,filterData,setfilterData, logout,user,addToCart ,cart ,decreaseQty,removeFromCart,clearCart,shippingAddress,userAddress,userOrder}}>
        {props.children}
      </AppContext.Provider>
    </>
  );
};

export default AppState;
