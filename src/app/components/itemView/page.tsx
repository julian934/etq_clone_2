'use client'
import React,{useState,useEffect} from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCartItem, getItem } from '@/app/lib/database/connections'

import Image from 'next/image'
import { getItemPrice } from '@/app/lib/database/connections'
//import { getItem } from '@/app/lib/database/connections'

type Props = {
  id:string | undefined | null | any
}

const ItemView = ({id}:Props) => {
  const [priceData,setPriceData]=useState<any>()
    const {data}=useQuery({
        queryKey:['Current Item'],
        queryFn:()=>getItem(id),
        staleTime:1000 * 60 * 5
    });
    useEffect(()=>{
      const fetchPrice=async()=>{
        if(data && !priceData){
          try {
            let price=await getItemPrice(`${data?.default_price}`);
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
    
    },[data,priceData]);
    if(data!=undefined) console.log(data)
      console.log(" Item Data: ", data)
      console.log("ID: ", id)
      
      if(priceData!=undefined) console.log("Price Data: ", priceData)
  return (
    <div className=' flex max-sm:flex-col flex-row text-black w-full justify-around' >
      <div className='flex max-sm:flex-col  ' >
        {data?.images!=undefined && <Image className=" h-8 w-8" width={100} height={100} src={data?.images[0]} alt={data?.name} />}
       <h1 className="flex" >{data?.name}</h1>
     
      </div>
      
             <h1 className="flex" >Default </h1>
             
              <div className="flex justify-between w-full " >
                 
                
              <h1 className="flex " >{priceData}</h1>
              </div>
              
            
      </div>
  )
}

export default ItemView