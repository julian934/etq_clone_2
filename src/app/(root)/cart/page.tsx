"use client"
import { useEffect, useState,useRef } from "react"
import React from 'react'
import NavBar from "@/app/components/ui/nav/navbar";
import Footer from "@/app/components/ui/footer/footer";
import Image from "next/image";
import Dropdown from "@/app/components/ui/dropdown/dropdown";
import Arrow from '../../localImages/arrow/icons8-triangle-arrow-96.png'
import { VisualEditing } from "next-sanity";
import Link from "next/link";

type Props = {}
console.log(process.env.REACT_PUBLIC_STRIPE_CLIENT_SECRET_KEY)
const Cart = (props: Props) => {
  const [cartItems,setCart]=useState<any>([]);
  const [totalShipping,setTotalShipping]=useState<any>([]);
  const [totalCost,setTotalCost]=useState<any>([]);
  const [totalQuantity, setTotalQuantity]=useState([]);
  useEffect(()=>{
    
  })

  const handleCheckout=()=>{

  }
  return (
    <div className="flex grid grid-cols-4 grid-rows-4 bg-white " >
      <div className=" row-start-1 col-start-1 col-span-4" >
      <NavBar/>
      </div>
       <div className="flex flex-col col-start-1 row-start-2 px-2 " >
          <h1 className=" font-semibold " >Your bag</h1>
          <div className="flex flex-row  space-x-2 " >
            <Link className=" flex flex-row  space-x-2 "  href='/' >
             <Image className=" h-6 w-6  -rotate-90 "  src={Arrow} alt='Keep Shopping' />
             <h2 className="Keep Shopping self-center "    >Keep Shopping</h2>
             </Link>
          </div>
       </div>
        <div className="flex flex-col col-start-2 row-start-2 row-span-2 col-span-3 " >
          <div className="flex justify-around w-full " >
             <h1 className=" " >Product</h1>
             <h1 className=" " >Color</h1>
             <h1 className="" >Size</h1>
             <h1 className=" " >QTY</h1>
             <h1 className="" > Price </h1>
          </div>
          <hr className="bg-black  space-x-4" />
           {cartItems && cartItems.map((item:any)=><div className=" flex flex-row w-full h-12 space-y-2 " >
            <div className="flex flex-row w-full h-full justify-around" >
              <Image className=" h-8 w-8" src={item?.images[0]} alt={item.name} />
              <h1 className="" >{item.name}</h1>
              </div>
             <h1 className="" >{item.name}</h1>
              <h1 className="" >{item.size}</h1>
              <div className="" >
                  <Dropdown/>
              </div>
              <h1 className="" >{item.price}</h1>
            <hr className="w-full h-full" />
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
           <button className=" w-full h-full bg-black text-white text-center "  onClick={handleCheckout} >Checkout</button>
           </div>
        </div>
       <div className=" row-start-4 col-start-1 col-span-4" >
       <Footer/>
       </div>
       
    </div>
  )
}

export default Cart