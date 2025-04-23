'use client'
import React,{useState,useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getMadeCover } from '@/app/lib/database/connections'
import { useQuery } from '@tanstack/react-query'
type Props = {}

const Made = (props: Props) => {
  const [made,setMadeState]=useState<any>();
  const {data,refetch}=useQuery({
    queryKey:['howItsMade'],
    queryFn:()=>getMadeCover(),
    staleTime:1000 * 60 * 5
  })
   useEffect(()=>{
      if(!data){
        console.log("Data is undefined, refetching...");
        refetch(); // Manually trigger refetch if data is missing
        
      }
      if(data!=undefined){
        let currData=data?data.data[0]:null;
        setMadeState(currData);
       }
    },[data,refetch]);
    if(data!=undefined){
      console.log("curr: ", data)
    }
    if(made){
      console.log(made?.data?.data[0]?.images[0])
    }
    console.log('Data check: ', data)
  return (
    <div className=' px-2 ' >
      
      <div className='' >
        {data && <Image className='w-full h-full' src={data.data[0]?.images[0]} width={400} height={400} alt=' How-Its-Made' />}
        
          <div className='' >
            <h1 className='' >We do it with grace.</h1>
              <h2 className='' >Made in Europe.</h2>
               <Link className='' href='/' >Read more</Link>
          </div>
      </div>
      </div>
  )
}

export default Made