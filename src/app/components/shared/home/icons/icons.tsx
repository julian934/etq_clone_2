'use client'
import Image from 'next/image'
import Link from 'next/link'
import React,{useEffect,useState} from 'react'
import { useQuery } from '@tanstack/react-query'
import { getIconCover } from '@/app/lib/database/connections'
type Props = {}

const Icons = (props: Props) => {
  const [iconState,setIconState]=useState<any>()
  const {data,refetch}=useQuery({
    queryKey:['icons'],
    queryFn:()=>getIconCover(),
    staleTime:1000 * 60 * 5
  })
  useEffect(()=>{
    if(!data){
      console.log("Data is undefined, refetching...");
      refetch(); // Manually trigger refetch if data is missing
      //const currData=data;
      //setIconState(currData)
    }
    if(data!=undefined){
      let currData=data?data.data[0]:null;
      setIconState(currData);
     }
  },[data,refetch])
  if(data!=undefined){
    console.log(data)
  }
  if(iconState!=undefined){
    console.log('curr icon: ', iconState)
  }
  return (
    <div className=' px-2' >
      
      <div className='' >
        {data && <Image className='w-full h-full' src={data.data[0].images[0]} width={400} height={400} alt=' Icons' />}
          <div className='md:-top-12' >
            <h1 className='' >Evolving the classics.</h1>
              <h2 className='' >Icons only.</h2>
               <Link className='' href='/' >Read more</Link>
          </div>
      </div>
      </div>
  )
}

export default Icons