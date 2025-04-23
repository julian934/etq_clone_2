'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/app/lib/actions/getData'
import Link from 'next/link'
import NavBar from '@/app/components/ui/navRedux/navbar'
import Footer from '@/app/components/ui/footer/footer'
import * as motion from 'motion/react-client'
import Image from 'next/image'
import {AnimatePresence} from "motion/react"
import GetPrice from '@/app/components/hooks/getPrice'
import filterImg from '@/app/localImages/UI/filter-black.png'
type Props = {}

const Sales = (props: Props) => {
    const {data}=useQuery({
        queryKey:['allItems'],
        queryFn:()=>getProducts(),
        staleTime:1000*60*5
    })
    if(data!=undefined) console.log(data)
  return (
    <div className='bg-white text-black' >
        <motion.div className='w-full' >
            <NavBar/>
        </motion.div>
        <div className='relative absolute' >
            <motion.div className=' w-full max-h-64 overflow-hidden  ' >
            <h1 className=' relative  justify-self-center self-center text-xl text-white z-100 top-56 ' >Sales</h1>
            
             
            </motion.div>
            
        </div>
        <div className='w-full' >
         <div className='flex justify-between p-8 ' >
           <h1 className='' >{data?.data?.length} items</h1>
          <motion.div className='' >
            <Image className='flex w-6 h-6 justify-center' src={filterImg} alt='Filter Image' />
            
            <button className='' onClick={()=>{}} >Filter & Sort</button>
            </motion.div>
            
         </div>
         <div className='flex flex-wrap self-center w-full p-2 gap-x-8' >
            {data && data?.data?.map((items:any)=>
            <div className='flex flex-col justify-self-between self-center bg-slate-100 p-8  ' >
                <Link href={`/collections/${items.id}`} >
                
                <Image className=' w-64 h-64 ' src={items.images[0]} width={100} height={100} quality={100} alt={items.name} />
                <h1 className='text-lg w-40' >{items.name}</h1>
                <p className='' >${items.default_price}</p>
                </Link>
            </div>)}

         </div>
        </div>
        
        <Footer/>
        </div>
  )
}

export default Sales