'use client'
import React,{useState,useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getComfortCover } from '@/app/lib/database/connections'
import { useQuery } from '@tanstack/react-query'
type Props = {}

const Comfort = (props: Props) => {
  const [comfort,setComfortState]=useState<any>();
  const {data,refetch}=useQuery({
    queryKey:['comfortCover'],
    queryFn:()=>getComfortCover(),
    staleTime:1000 * 60 * 5
  })
   useEffect(()=>{
      if(!data){
        console.log("Data is undefined, refetching...");
        refetch(); // Manually trigger refetch if data is missing
       
      } if(data!=undefined && data?.data?.images!=null){
        let currData=data?data.data[0]:null;

        currData !=null && setComfortState(currData.images[0]);
       }
    },[data,refetch]);
    if(data!=undefined){
      console.log("curr: ", data)
    }
   if (comfort!=null) {
  console.log(comfort);
}

    console.log('Data check: ', data)
  return (
    <div className=' px-2 ' >
      <div className='' >
        {data!=undefined && <Image className='w-full h-full' src={data.data[0]?.images[0]} width={400} height={400} alt=' Comfort' />}
        
          <div className='' >
            <h1 className='' >We do it with grace.</h1>
              <h2 className='' >Made in Europe.</h2>
               <Link className='' href='/' >Read more</Link>
          </div>
      </div>
    </div>
  )
}

export default Comfort