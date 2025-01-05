'use client'
import React,{useState,useEffect,useRef,useContext} from 'react';
import { StoreStateContext } from '@/app/lib/context/storeContext';
import Image from 'next/image';
type Props = {}

const Added = (props: Props) => {
  return (
    <div className='flex flex-col border-2 bg-slate-200  ' >
        
        <h1 className='flex justify-center' >Added to shopping bag</h1>
        <hr className='' />
        <div className='' >
            {/* Item, size & price*/}
        </div>
        <hr className='' />
         <h1 className='' > Take good care, last longer. </h1>
         <p className='' >We recommend using our cleaning kit for footwear.</p>
         <div className='' >
           <div className='' >
             <Image className='' src='' alt='recommendation 1' />
             <h1 className='' > Item 1 Name </h1>
             <h2 className='' > Item 1 Price </h2>
           </div>
           <div className='' >
             <Image className=''  src='' alt='recommendation 2' />
             <h1 className='' > Item 2 Name</h1>
             <h2 className='' >Item 2 Price</h2>
           </div>
           <button className='' onClick={()=>{}} >Add to Bag</button>
           <button className='' onClick={()=>{}} >Add to Bag</button>
         </div>
         <div className='' >
            <hr className='' />
            <button className='' onClick={()=>{}} >Continue shopping</button>
            <button className='' onClick={()=>{}} >Checkout</button>
         </div>
        </div>
  )
}

export default Added