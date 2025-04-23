'use client'
import React,{useState,useEffect} from 'react'
import { useQuery } from '@tanstack/react-query'
import * as motion from 'motion/react-client'
import { AnimatePresence } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { getHomeMensWearCover } from '@/app/lib/database/connections'

type Props = {}

const Menswear = (props: Props) => {
   const [mensWear,setMenswearState]=useState<any>([]);
  const {data,refetch,isFetching,isError}=useQuery({
    queryKey:['menswearCover'],
    queryFn:()=>getHomeMensWearCover(),
    staleTime:1000 * 60 * 5
  })
   useEffect(()=>{
      if(!data){
        console.log("Data is undefined, refetching...");
        refetch(); // Manually trigger refetch if data is missing
        const currData=data?.data?.data;
        setMenswearState(currData)
      }
    },[data,refetch]);
    if(data!=undefined){
      console.log("curr: ", data)
    }
    if(mensWear){
      console.log(mensWear?.data?.data[0]?.images[0])
    }
    console.log('Data check: ', data)

  return (
    <div className='flex self-center justify-center w-full' >
      
        <AnimatePresence>
          <motion.div className='flex flex-col  max-sm:flex-col' >
            <motion.div className='flex  justify-between  ' >
            <motion.div className='flex md:self-center ' >
               <Image className='h-full  md:h-80vh  md:w-40vw  ' src={data?.data?.data[1]?.images[0]} width={1200} height={1200} alt={data?.data?.data[0]?.name} />
            </motion.div>
            <motion.div className='flex max-sm:hidden' >
               <Image className=' max-sm:hidden md:h-80vh  md:w-40vw  ' src={data?.data?.data[5]?.images[0]} width={1000} height={1000} alt={data?.data?.data[0]?.images[0]} />
            </motion.div>
            </motion.div>
            <motion.div className='flex md:w-1/2 flex-col p-4 self-center space-y-2 ' >
               
               {/* <Image className='' src='/' width={100} height={100} alt='black square' />*/}
               <motion.div className='flex w-6 h-6  bg-black' >

               </motion.div>
               <p className=' ' > At our Dutch design studio, we focus on the things even the eye can't see, to build better. We create apparel 
                but approach it as product design. It makes all the difference.   </p>
                <Link className=' w-36 h-14 border-2 border-slate-300  self-start text-center  py-4 ' href='/' >
                   Shop Menswear
                </Link>
            </motion.div>
          </motion.div>

        </AnimatePresence>
      </div>
  )
}

export default Menswear