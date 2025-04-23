'use client'
import React,{useState,useRef,useEffect} from 'react'
//import search from '@/app/localImages/UI/mobile-menu.png'
import search from '@/app/localImages/UI/search-button.png'
import * as motion from 'motion/react-client'
import Image from 'next/image'
import blackX from '@/app/localImages/UI/black-x.png'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/app/lib/actions/getData'

type Props = {}

const MobileSearch = (props: Props) => {
    const [mobileSearchModal,setMobileSearchModal]=useState<boolean>(false)
     const [searchInfo,setSearchInfo]=useState<any>('')
          const searchRef=useRef<any>('');
          const {data:products}=useQuery({
            queryKey:['products'],
            queryFn:()=>getProducts(),
            staleTime: 1000* 60 * 5
          })
          const searchData=()=>{
            let currData=products?.data;
            //setSearchInfo(searchRef.current.value)
            let searchTerm=currData.filter((vals:any)=>vals?.name?.includes(searchRef.current.value))
            setSearchInfo(searchTerm)
    
          }
  return (
    <div className='flex' >
       
        <motion.button onClick={()=>{setMobileSearchModal(!mobileSearchModal)}} ><Image className='w-6 h-6' src={search} alt='Search Button' /></motion.button>
         <motion.div className='flex justify-start ' >
                     {mobileSearchModal && <motion.div className='fixed 
                     h-[600px] w-full p-8  top-6 left-2 bg-white' > 
                          <motion.div className='flex flex-col -mt-8 ' >
                              <div className='flex self-end justify-around w-2/3  ' >
                                <Link className='flex justify-center self-center text-2xl  ' href='/homeRedux' >ETQ.</Link>
                                <motion.button className='flex justify-end  self-center pr-12 ' onClick={()=>{setMobileSearchModal(!mobileSearchModal)}} ><Image className='w-6 h-6' src={blackX} alt='Search Button' /></motion.button>

                              </div>
                              <div className='flex w-full py-4' >
                                  <hr className='w-full ' />
                              </div>
                              <div className='flex px-4 w-full '  >
                                <input className='w-full' onChange={searchData} placeholder='Start typing what you&apos;re looking for ...' ref={searchRef} />

                              </div>
                              <div className='flex w-full py-4' >
                                  <hr className='w-full ' />
                              </div>
                              <div className=' flex flex-wrap w-full space-x-2' >
                                {searchInfo && <h1 className='flex text-2xl px-2 ' >Products: </h1>}
                                {searchInfo && searchInfo?.map((vals:any)=><div className=' w-full  overflow-hidden space-x-6 space-y-2 ' >
                                  <Link className='flex w-full justify-between space-x-2' href={`/collections/${vals.id}`} >
                                 
                                    <h1 className='flex justify-start self-center ' > {vals?.name} </h1>
                                    <Image className='w-20 h-20 justify-self-end flex self-end ' width={100} height={100} quality={100} src={vals.images[0]}  alt={vals.name} />
                                    </Link>
                                </div>)}

                              </div>
                              </motion.div>
                            
                        </motion.div>}
                </motion.div>
        </div>
  )
}

export default MobileSearch