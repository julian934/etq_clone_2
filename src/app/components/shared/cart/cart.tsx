'use client'
import React,{useState,useEffect,useContext} from 'react'
import { useQuery } from '@tanstack/react-query'
import * as motion from 'motion/react-client'
import { StoreStateContext } from '@/app/lib/context/storeContext'
import Image from 'next/image'
import Link from 'next/link'
import { Session } from 'next-auth'
import { updateUser } from '@/app/lib/database/connections'
import CartItemData from '../cartItemData/cartItemData'

type Props = {}

const Cart = (props: Props) => {
  const [active,setActive]=useState<any>(null);
  const ctx=useContext(StoreStateContext);
  const currData:any=ctx.userState;
  
  const handleRemove=async(id:any)=>{


  }
  const shippingCost=0
  const totalCost=0 
  console.log('Current User Check: ', currData);

  return (
    <div className=' top-8 bg-white text-black z-[9999]' >
     
      <motion.button onClick={()=>setActive(!active)} className='flex rounded-2xl w-8  mt-4 justify-center bg-black gap-4' >
           <h1 className='text-white flex' >{currData? currData?.data?.userCart.length:0}</h1>
      </motion.button>
      <motion.div className='  fixed  right-28 min-h-[500px] max-h-[800px] min-w-[500px] overflow-hidden bg-white  right-8 z-[9999] ' >
            {active && currData!=null && currData!=undefined ? <div className='max-h-[500px]' >
                {currData?.data?.userCart?.map((vals:any)=><div className='flex flex-col gap-2 space-y-2 ' key={vals.id} >
              <div className='flex w-full  self-center border-2' >
                   <CartItemData id={vals.product} quantity={vals.quantity} />
                
              </div>
               <div className='flex z-[9999] ' >
                    <hr className='flex w-full' />
               </div>
               
            </div>)}
           
            </div>
             :null}
            {active && currData!= null && currData!=undefined?
            <div className='flex justify-self-end flex-col p-2 min-h-[50px] w-1/3 ' >
               <div className='flex z-[9999] ' >
                    <hr className='flex w-full' />
               </div>
               <div className='flex justify-between p-4' >
                   <h1> Shipping: </h1>
                   <h1>${shippingCost}</h1>
               </div>
               <div className='flex justify-between p-4' >
                <h1 className='' >Total:</h1>
                  <h1 className='' >${totalCost}</h1>
               </div>
               <div className='flex z-[9999] ' >
                    <hr className='flex w-full' />
               </div>
               
                      <Link className='flex  justify-self-end p-4 bg-black text-white self-center w-full ' href='/cart'><h1 className='text-center w-full' >Checkout</h1></Link>
               
            </div>
          :null}
            
      </motion.div>
      {/* <motion.div className=' ' >
        
        {active && <hr className=' flex w-full h[-1000px] ' />}
          {active?  <div className='flex w-full justify-between ' >
              <div className=' flex justify-between ' >
                <h1 className='' >Shipping:</h1>
                <h1 className='' >${shippingCost}</h1>
              </div>
               <div className='flex justify-between ' >
                <h1 className='' >Total:</h1>
                  <h1 className=' ' >${totalCost}</h1>
               </div>
                      
            </div>: null}
           
           {active? <div className='flex bg-black text-white w-full' >
              <Link className='flex justify-end' href='/cart'  >Checkout</Link>
            </div>: null}
            
            
            {active && <hr className='flex w-full ' />}
        </motion.div>*/}
        
     
      </div>
  )
}

export default Cart