'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getFootWear } from '@/app/lib/database/connections'
import NavBar from '@/app/components/ui/navRedux/navbar'
import Footer from '@/app/components/ui/footer/footer'
import * as motion from 'motion/react-client'
import Image from 'next/image'
import {AnimatePresence} from "motion/react"
import Link from 'next/link'
import GetPrice from '@/app/components/hooks/getPrice'
import filterImg from '@/app/localImages/UI/filter-black.png'

type Props = {}

const FootWear = (props: Props) => {
    const {data}=useQuery({
        queryKey:['footwear'],
        queryFn:()=>getFootWear(),
        staleTime:1000* 60 * 5,
        
    })
    if(data!=undefined) console.log(data)
  return (
    <div className='bg-white text-black' >
        <motion.div className='w-full' >
            <NavBar/>
        </motion.div>
        <div className='relative absolute' >
            <motion.div className=' w-full max-h-64 overflow-hidden  ' >
            <h1 className=' relative  justify-self-center self-center text-xl text-white z-100 top-56 ' >Footwear</h1>
              {data!=undefined && <Image className=' w-full   overflow-hidden z-100  -top-12 ' width={1500} height={1500} src={data?.data?.data[9]?.images[0]} quality={100} alt='footwear-banner' />} 
             
            </motion.div>
            
        </div>
        <div className='w-full' >
         <div className='flex justify-between p-8 ' >
           <h1 className='' >{data?.data?.data.length} items</h1>
          <motion.div className='space-y-2' >
            <Image className=' flex w-6 h-6 justify-self-center ' src={filterImg} alt='Filter Image' />
            
            <button className='' onClick={()=>{}} >Filter & Sort</button>
            </motion.div>
            
         </div>
         <div className='flex flex-wrap self-center w-full p-2 gap-x-8' >
            {data && data?.data?.data?.map((items:any)=>
            <div className='flex flex-col justify-self-between self-center bg-slate-200 p-8  ' key={items.id} >
                <Link href={`/collections/${items.id}`} >
                
                <Image className=' w-64 h-48 ' src={items.images[0]} width={100} height={100} alt={items.name} />
                <h1 className='text-lg w-40' >{items.name}</h1>
                
                <GetPrice id={items?.id} />
                </Link>
            </div>)}

         </div>
        </div>
        
        <Footer/>
        </div>
  )
}

export default FootWear