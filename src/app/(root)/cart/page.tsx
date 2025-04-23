"use client"
import { useEffect, useState,useRef } from "react"
import React from 'react'
import NavBar from "@/app/components/ui/navRedux/navbar";
import Footer from "@/app/components/ui/footer/footer";
import Image from "next/image";
import Dropdown from "@/app/components/ui/dropdown/dropdown";
import Arrow from '../../localImages/arrow/icons8-triangle-arrow-96.png'
import { VisualEditing } from "next-sanity";
import Link from "next/link";
import { StoreStateContext } from "@/app/lib/context/storeContext";
import { useContext } from "react";
import { getCheckOut } from "@/app/lib/database/connections";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getUser } from "@/app/lib/database/connections";
import CartItemData from "@/app/components/shared/cartItemData/cartItemData";
import axios from "axios";
//import { getCartData } from "@/app/lib/database/connections";

type Props = {}
console.log(process.env.REACT_PUBLIC_STRIPE_CLIENT_SECRET_KEY)
const Cart = (props: Props) => {
  const [currUser,setCurrUser]=useState<any>();
  
  const [cartItems,setCart]=useState<any>([]);
  const [totalShipping,setTotalShipping]=useState<any>([]);
  const [totalCost,setTotalCost]=useState<any>([]);
  const [totalQuantity, setTotalQuantity]=useState([]);
  const ctx=useContext(StoreStateContext);
  const hasUpdated = useRef(false);
  
  const {data}=useQuery({
    queryKey:['cart data'],
    queryFn:()=>ctx.cartData(),
    staleTime:1000 * 60 * 5
  })
  useEffect(() => {
    // Only update if user data is fetched successfully
   // const user = ctx.cartData();
    if(data!=undefined){
      const currData: any =data? data: null;
      console.log('curr data: ', currData)
      setCurrUser(currData)
    }
   
  },[data]);
  const handleCheckout=async()=>{
  //  const newData = currUser?.data?.userCart;

    //if (currUser) {
     // const sendCheckout = await getCheckOut(currUser.data.userCart); causes infinite loop, send data elsewhere.
     // return sendCheckout;
     //const sendCheckout:any=currUser.userCart;
    // console.log(" Checkout: ", sendCheckout)
   //  const currCheckout=sendCheckout? sendCheckout?.data?.userCart : null
     //console.log(" current Checkout: ", currCheckout);
    // const checkoutData=await getCheckOut(currUser.userCart)
  
    // return checkoutData
    //} else {
    //  console.error("No user cart data available");
  //  }
    try {
      if(currUser){
        const response = await axios.post('/api/checkout', {
          cart:currUser.userCart,
        });
    
        const { url } = response.data;
    
        if (url) {
          window.location.href = url; // ✅ Redirect to Stripe Checkout
        } else {
          console.error('Stripe URL missing in response:', response.data);
        }
      }
      
    } catch (error) {
      
    }
  }
  console.log("Sending cart to checkout: ", currUser?.userCart);

  console.log("User Check: ", ctx.userState)
  console.log("Curr User: ", currUser)
  console.log("Current Data: ", data)
  console.log("Data Test: ",)
  console.log("cart data: ", ctx.cartItems?.userCart)
  if(currUser!=undefined) console.log("Testing curr user: ", currUser)
  return (
    <div className="  bg-white  text-black  " >
      <div className=" border-2 border-black z-100 w-full " >
      <NavBar/>
      </div>
       <div className="flex flex-col  text-black  border-2 border-black px-2 " >
          <h1 className=" font-semibold " >Your bag</h1>
          <div className="flex flex-row  space-x-2 " >
            <Link className=" flex flex-row  space-x-2 "  href='/' >
             <Image className=" h-6 w-6  -rotate-90 "  src={Arrow} alt='Keep Shopping' />
             <h2 className="Keep Shopping self-center "    >Keep Shopping</h2>
             </Link>
          </div>
       </div>
        <div className="flex min-h-40vh space-y-2 p-4  flex-col  self-center justify-self-end w-4/5 max-sm:w-full z-100 text-black " >
          <div className="flex justify-around w-full " >
             <h1 className=" " >Product</h1>
             <h1 className=" " >Color</h1>
             <h1 className="" >Size</h1>
             <h1 className=" " >QTY</h1>
             <h1 className="" > Price </h1>
          </div>
          <hr className="bg-black w-full  space-x-4" />
           {currUser && currUser?.userCart?.map((item:any)=><div key={item.product} className=" flex text-black  flex-row w-full h-12 space-y-2  " >
            
            <CartItemData id={item?.product} quantity={item?.quantity} />
           </div>)}
           <div className="flex flex-col justify-end self-end w-1/3 space-y-4" >
           <div className="flex flex-row space-between w-full " >
              <h3 className="" > Shipping </h3>
              <h3 className="" >{totalShipping}</h3>
           </div>
           <div className="flex flex-row space-between w-full" >
            <h3 className="" > Total  </h3>
            <h3 className=" " >{totalCost}</h3>
           </div>
           <button className=" w-full h-12 bg-black text-white text-center  "  onClick={handleCheckout} >Checkout</button>
           </div>
        </div>
       <div className=" row-start-4 col-start-1 col-span-4" >
       <Footer/>
       </div>
       
    </div>
  )
}

export default Cart