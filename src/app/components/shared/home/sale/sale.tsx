'use client'
import React,{useEffect,useState} from 'react'
import { useQuery } from '@tanstack/react-query'
import * as motion from 'motion/react-client'
import { getHomeSaleCover } from '@/app/lib/database/connections'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence } from 'motion/react'

type Props = {}

const Sale = (props: Props) => {
  const [saleData,setSaleData]=useState<any>(false);
  const [saleState,setSaleState]=useState<any>([]);
  const {data,refetch,isFetching,isError}=useQuery({
    queryKey:['homeSale'],
    queryFn:()=>getHomeSaleCover(),
    staleTime: 1000 * 60 * 5
  })
 
  useEffect(()=>{
    if(!data){
      console.log("Data is undefined, refetching...");
      refetch(); // Manually trigger refetch if data is missing
    }else{
      const currData=data?.data?.data;
      setSaleState(currData)
    }
  },[data,refetch])
  if(data!=undefined){
    console.log("curr: ", data)
  }
  if(saleState){
    console.log(saleState)
  }
  console.log('Data check: ', data)
  const variants = {
    hidden: (direction:any) => ({
      opacity: 0,
      x: direction === 1 ? -300 : 300
    }),
    visible: { opacity: 1, x: 0 }
  }
  return (
    <motion.div className='flex  max-sm:flex-col' >
      <AnimatePresence  >
      <motion.div className='flex  h-lvh w-lvw max-sm:h-4/5 ' >
          <Image className='h-full w-full' src={data?.data?.data[14]?.images[0]} alt={data?.data?.data[14]?.name} width={800} height={800}  quality={100} />
      </motion.div>
      <motion.div className='flex flex-col md:self-center ' >
        <motion.div className='flex flex-col md:self-center max-sm:self-end  md:p-4' >
        <motion.div className='' >
          <h2 className='font-bold' >Up to 50% off.</h2>
        </motion.div>
        <motion.div className='' >
          <h1 className='font-semibold' >Spring Sale</h1>
        </motion.div>
        <motion.div className='' >
           <h3 className='font-medium' >Wardrobe Essentials with endless comfort.</h3>
        </motion.div>
        <motion.div onHoverStart={()=>{
              setSaleData(!saleData)
        }} onHoverEnd={()=>{
          setSaleData(true)
        }} className='' >
           <Link className='font-light' href='/collections/sale' >Shop All</Link>
           {/*(<motion.div className='' initial='visible' whileHover={{translateX:(1300)}}  exit={{translateX:0}} >
             <hr/>
           </motion.div>
             */}
           
           <motion.div className='' initial="visible" variants={variants} animate={saleData?"visible":"hidden"}  >
             <hr/>
           </motion.div>
        </motion.div>
       

        </motion.div>
        
      </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export default Sale