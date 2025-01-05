'use client'
import React,{useState} from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { connectToMongodb } from '@/app/lib/database/connections'
import { getUsers } from '@/app/lib/actions/getData'
import { kings } from '@/app/lib/actions/getData'
import { useEffect } from 'react'
import { AxiosResponse } from 'axios'
import Image from 'next/image'
type Props = {}

const Kings = (props: Props) => {
  const [currData,setCurrData]=useState<any[] | null | undefined  >([]);
  const {data}=useQuery({
    queryKey:['kingscoll'],
    queryFn:kings,
    staleTime:5000,
  })

  useEffect(()=>{
     if(data?.data){
      const dataState=data?.data
      setCurrData(dataState)
     }
  },[currData,data])
 
  console.log('Data is ' + data)
  if(data){
    console.log(data?.data)
  }
  return (
    <div className='flex self-center flex-col p-4' >
        {/*data && data?.map((vals:any)=><div key={vals._id} >{vals}</div>)*/}
         <h1 className='text-4xl md:p-12 ' >The Kings Collection</h1>
         <div className='flex justify-center max-sm:flex-col border-2 justify-self-center self-center h-full' >
         {currData && currData.slice(0,3).map((vals:any)=>(<div key={vals.id} className='flex w-3/4 h-3/4 flex-col max-sm:self-center md:px-4' >
         <Link className='py-8' href={`/products/${vals.id}`} >
          <Image className='w-[800px] h-[1000px] max-sm:w-[600px] max-sm:h-[800px] size-4/5 ' src={vals?.images[0]} alt={`${vals.name}`} width={100} height={100} quality={100}  />
            <h1 className='text-black text-lg font-md max-sm:text-center ' >{vals.name}</h1>
            </Link>
               </div>))}
         </div>
      </div>
  )
}

export default Kings