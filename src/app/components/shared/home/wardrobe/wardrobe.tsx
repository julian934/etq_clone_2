'use client'
import React,{useState,useEffect} from 'react'
import * as motion from 'motion/react-client'
import { AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getHomeWardrobeCover } from '@/app/lib/database/connections'
import Image from 'next/image'
type Props = {}

const Wardrobe = (props: Props) => {
  const [wardrobeState,setWardrobeState]=useState<any>([]);
  const {data,refetch,isFetching,isError}=useQuery({
    queryKey:['homeWardrobe'],
    queryFn:()=>getHomeWardrobeCover(),
    staleTime:1000 * 60 * 5
  })
  useEffect(()=>{
    if(!data){
      console.log("Data is undefined, refetching...");
      refetch(); // Manually trigger refetch if data is missing
     
    }
    if(data!=undefined){
     let currData=data?data : null;
     setWardrobeState(currData);
    }
  },[data,refetch]);
  if(wardrobeState!=undefined){
    console.log(wardrobeState)
  }
  if(data!=undefined){
    console.log("curr: ", data)
  }
  return (
    <div className='flex ' >
      
          <AnimatePresence>
            <motion.div className='flex flex-col w-full' >
             <motion.div className='flex justify-between px-4 ' >
              <h2 className='text-2xl' >
                 Explore a selection of our wardrobe essentials.
              </h2>
              <Link className='flex max-sm:hidden self-center' href='/' >Shop all</Link>     
              </motion.div>
              <motion.div className='flex flex-wrap md:px-4  p-4' >
                  {wardrobeState && wardrobeState?.data?.map((vals:any)=><Link className=' max-sm:w-1/2 md:w-1/4 md:px-2 ' href={`${vals.link}`} key={vals.label} >
                        <Image className=' flex max-sm:w-[200px] md:w-[400px] md:h-[500px]  w-full  ' src={vals.images[0]} width={1000} height={1000} quality={100} alt={vals.label} />
                        <h1 className='flex text-xl' >{vals.label}</h1>
                  </Link>)}
              </motion.div>
              <Link className='flex md:hidden border-2 border-slate-200 text-lg text-center self-center w-20 h-12' href='/' >Shop all</Link>     
            </motion.div>
          </AnimatePresence>
      </div>
  )
}

export default Wardrobe