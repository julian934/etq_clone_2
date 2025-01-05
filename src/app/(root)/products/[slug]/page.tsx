'use client'
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useState,useEffect,useRef,useContext } from 'react';
import { StoreStateContext } from '@/app/lib/context/storeContext';
import { productDetails } from '@/app/lib/actions/getData';
import NavBar from '@/app/components/ui/nav/navbar';
import Image from 'next/image';
import Added from '@/app/components/ui/added/added';
import Footer from '@/app/components/ui/footer/footer';
import Cart from '@/app/components/shared/cart/cart';
type Props = {}

const Products = ({params}:{params:{slug:string}}) => {
  const [bagged,setBagged]=useState<any>(false)
  const [prod,setProd]=useState<any>([]);
  const [images,setImages]=useState<any>([]);
  const {data}=useQuery({
    queryKey:['product page'],
    queryFn:()=>productDetails(params?.slug)
  });
  const ctx=useContext(StoreStateContext);
   if(data){
    console.log(data);
   }
   const bagCheck=()=>{
    if(bagged==true){
      ctx.addToCart(prod)
      setBagged(false)
    }else{
      setBagged(true)
    }
   }
   
   useEffect(()=>{
       if(data?.data){

       }
       const currData= data? data.data.data :null
       if(currData!=null){
        setImages(currData.images)
       }
       setProd(currData)
   },[data,prod,images]);
   //Design product pages
   console.log(data?.data?.data);
   console.log(prod)
   console.log(images)
   console.log(ctx.currCart)
   //console.log(prod.images[0])
   //Map over product images in a grid formation that covers 2/3 of the product page and wraps in a way
   // that continues to show the two-item per line grid if users scroll down.

   //On click for add to bag, show modal with added items, and X to close, with suggestions in the modal based on the item type. 
  return (
    <div className='flex grid grid-cols-4 grid-rows-4  max-sm:flex-col grid-cols-3 max-sm:grid-rows-3 bg-white ' >
      Dynamic Test:{params.slug}
      <div className='flex col-start-1 col-span-4 row-start-1 z-50' >
      <NavBar/>
      </div>
      
      <div className='flex absolute  w-full h-full  row-start-1 row-span-3 col-start-1 col-span-3 p-8 ' >
        {/* Background with all the available pics of the item. */}
        {data?.data && <div className='flex ' key={prod?.id} >
            
        {prod?.images?.length > 0 && prod?.images?.length==1 ? (
  <Image className='w-full h-full' src={prod.images[0]} alt={prod.name} height={100} width={100} quality={100} />
) : (
  <p className='' >No image available</p>
)}
          </div>}
      </div>
         {bagged?<div className='relative absolute w-92 h-92 z-50' >
             <Cart/>
         </div>:<></>}

        <div className='flex  border-2 flex-col bg-white  row-start-2 row-span-2 col-start-3  col-span-2 p-12 space-y-4 z-50 ' >
           <h1 className='flex text-xl ' >{prod?.name}</h1>
           <div className='flex flex-col space-y-4' >
            <h1 className='' >{prod?.default_price}</h1>
           <div className='' >
             {/* Dropdown for color*/}
           </div>
           <div className='' >
              {/* Dropdown for size*/}
           </div>
           {/*  Render differently depending on bagged state.*/}
           <div className=' w-full border-2 text-center' >
             <button className='text-lg w-full h-full hover:bg-black hover:text-white ' onClick={bagCheck} >Add to bag</button>
           </div>
           </div>
           
           <div className='flex flex-col' >
           <div className='' >
            
         
              <h1 className='' >Same day Shipment</h1>
              <p className='' >Orders placed below $9.99 are shipped the same day with FedEx.</p>
           </div>
           <div className='' >
              <Image className='' src='' alt='Item Box' />
              <h1 className='' >Easy returns & exchanges</h1>
              <p className='' >All orders can be easily return or exchanged for a different size.</p>
           </div>
           </div>
           {bagged==true && <div className=' flex ' >
            <Added/>
            </div>}
        </div>
      <div className='row-start-4 col-start-1 col-span-4 z-20' >
         <Footer/>
      </div>
      
      </div>
  )
}

export default Products