'use client'
import React,{useState,useEffect} from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCartItem, getItem } from '@/app/lib/database/connections'

import Image from 'next/image'
import { getItemPrice } from '@/app/lib/database/connections'

type Props = {}

const GetPrice = ({id}:{id:any}) => {
    const [priceData,setPriceData]=useState<any>()
    const {data}=useQuery({
        queryKey:['Current Item',id],
        queryFn:()=>getItem(id),
        staleTime:1000 * 60 * 5,
       
    });
    useEffect(()=>{
      const fetchPrice=async()=>{
        if(data?.data?.default_price){
          try {
            let price=await getItemPrice(`${data?.data?.default_price}`);
          if(price!=undefined){
            let currPrice=Intl.NumberFormat("en-US",{
              style:"currency",
              currency:"USD",
              maximumFractionDigits:2
            }).format(price.unit_amount/100)
            setPriceData(currPrice)
          }
          } catch (error) {
            console.error("Error fetching price:", error);
          }
          
        }
      }
    priceData==undefined && fetchPrice() 
    
    },[data?.data?.default_price]);
    if(data!=undefined) console.log(data)
      console.log(" Item Data: ", data)
      console.log("ID: ", id)
      console.log("Current Price: ", priceData)
      if(priceData!=undefined) console.log("Price Data: ", priceData)
  return (
    <div className='' >Price: {priceData}</div>
  )
}

export default GetPrice