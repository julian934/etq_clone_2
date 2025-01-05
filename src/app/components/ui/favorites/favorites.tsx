'use client'
import React from 'react'
import { useState,useContext,useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { favorites} from '@/app/lib/actions/getData'
import { StoreStateContext } from '@/app/lib/context/storeContext'
import Image from 'next/image'
import Link from 'next/link'
type Props = {}

const Favorites = (props: Props) => {
    const [favoriteData,setFavoriteData]=useState<any>([]);
    const {data}=useQuery({
        queryKey:['favorites'],
        queryFn:favorites
    })
    const [pageState,setPageState]=useState([0,1,2])
    console.log('favorites data',data?.data)
    const ctx=useContext(StoreStateContext)
    const prev=()=>{
        console.log('page turned')
        let currData=data?.data
        ctx.pagination(currData,'prev')
    }
    const next=()=>{
        console.log('page turned')
        let currData=data?.data  
        ctx.pagination(currData,'next')
    }  
    useEffect(()=>{
        if(data){
            setFavoriteData(data?.data?.data);
        }
    },[favoriteData,data])
    //For pagination, default values are 1,2 and 3. After that, updates with the next three pages until there are no more. Previous and next take you to the 
    //next or previous set from where you were.
    console.log(favoriteData)
  return (
   
<div className="flex flex-col  justify-center h-screen max-sm:px-4 border-2 md:w-full md:h-full ">
   {/* <!-- component -->*/}
   <h1 className='text-5xl px-4 ' >Favorites</h1>
    <div className=" flex flex-col  max-w-full md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto bg-white p-6 rounded-lg shadow-sm">

        <div className="flex justify-center md:w-4/5">
            <nav className="flex space-x-2" aria-label="Pagination">
                <button onClick={prev} className="relative inline-flex items-center px-4 py-2 text-sm bg-gradient-to-r from-violet-300 to-indigo-300 border border-fuchsia-100 hover:border-violet-100 text-white font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10">
                    Previous
                </button>
                <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-fuchsia-100 hover:bg-fuchsia-200 cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10">
                    1
                </a>
                <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-fuchsia-100 hover:bg-fuchsia-200 cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10">
                    2
                </a>
                <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-fuchsia-100 hover:bg-fuchsia-200 cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10">
                    3
                </a>
                <button onClick={next} className="relative inline-flex items-center px-4 py-2 text-sm bg-gradient-to-r from-violet-300 to-indigo-300 border border-fuchsia-100 hover:border-violet-100 text-white font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10">
                    Next
                </button>
            </nav>
        </div>
      

    </div>
    <div className='flex max-sm:flex-col self-center md:w-4/5 md:p-4 md:space-x-2  '>
            
            {/* Temp Data */}
            {data && favoriteData.reverse().slice(13,16).map((vals:any)=><div className='flex flex-col md:w-full md:space-x-2  ' key={vals.id} >
                <Link href={`/products/${vals.id}`} >
                <Image className=' w-full h-full ' width={100} height={100} src={vals.images[0]} alt={vals.name} />
                <h2 className='text-center' >{vals.name}</h2>
                </Link>
            </div>)}
         
        </div>
</div>
  )
}

export default Favorites