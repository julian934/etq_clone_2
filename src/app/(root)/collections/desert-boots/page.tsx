'use client'
import React,{useState,useContext,useEffect} from 'react'
import { useQuery } from '@tanstack/react-query'
import { getDesertBoots } from '@/app/lib/database/connections'
import Link from 'next/link'
import NavBar from '@/app/components/ui/navRedux/navbar'
import Image from 'next/image'
import { StoreStateContext } from '@/app/lib/context/storeContext'
import Footer from '@/app/components/ui/footer/footer'
import * as motion from 'motion/react-client'
import Filter from '@/app/components/ui/filterModal/filter'
import ItemView from '@/app/components/itemView/page'
import GetPrice from '@/app/components/hooks/getPrice'
import leftArrow from '@/app/localImages/UI/left-1.png'
import filterImg from '@/app/localImages/UI/filter-black.png'
type Props = {}

const Desert_Boots = (props: Props) => {
   const [filterModal,setFilterModal]=useState<any>(null);
  const {data}=useQuery({
    queryKey:['Desert_Boots'],
    queryFn:()=>getDesertBoots(),
    staleTime:1000 * 60 * 5
  })
  const ctx=useContext(StoreStateContext);
  useEffect(()=>{
     
  },[]);
  if(ctx.userData!=undefined) console.log(ctx.userState)
  if(data!=undefined) console.log(data);
  console.log(ctx.userState)
  return (
    <div className=' bg-white text-black ' >
      <div className='w-full' >
      <NavBar/>
      </div>
      <div className='flex min-md:w-1/5  w-full justify-between px-4 space-x-2 ' >
        <Image className='self-center' src={leftArrow} alt='left arrow' />
        
        <Link className='self-center' href='/collections/footwear' >Footwear</Link>
         <hr className=' h-6 origin-center  self-center rotate-0 border-2 ' />
          <h1 className='self-center w-full  ' >Desert Boots</h1>
      </div>
       <div className='flex justify-between p-8 ' >
                 <h1 className='' >{data?.data?.data.length} items</h1>
                <motion.div className='' >
                  <Image className='' src='' alt='Filter Image' />
                  
                  <button className='' onClick={()=>setFilterModal(!filterModal)} >Filter & Sort</button>
                  </motion.div>
                  
               </div>
               {filterModal && <div className='fixed h-screen bg-gray-100 z-100 ' >
                    <Filter/>
                </div>}
               
      <div className='flex self-start  flex-wrap justify-around gap-2 min-md:px-4 ' >
        {data !=undefined && data?.data?.data?.map((vals:any)=>
        <div className=' flex min-md:w-1/5 max-sm:w-1/3  min-md:h-3/4   '  key={vals.id} >
          <Link className=' space-y-4  ' href={`/collections/${vals.id}`} >
             
             <Image className='md:h-[400px] md:w-[400px] max-sm:h-[250px] max-sm:w-[400px] bg-slate-200 justify-around flex' width={300} height={300} src={vals.images[0]} alt={vals.name}  />
             <h1 className='justify-around text-lg max-sm:text-md text-start  flex ' >  {vals.name} </h1>
              <GetPrice id={vals?.id} />
             {/*<h3 className='justify-center text-lg text-start' > {vals.default_price} </h3> */}
             <h2 className='justify-around flex  text-slate-300 ' > </h2>
            

             

          </Link>
               
        </div>)}

      </div>
      <div className='' >
        <Footer/>

      </div>
      </div>
  )
}

export default Desert_Boots