'use client'
import React,{useState,useRef,useEffect} from 'react'
import mobileMenuImg from '@/app/localImages/UI/mobile-menu.png'
import blackX from '@/app/localImages/UI/black-x.png'
import * as motion from 'motion/react-client'
import Image from 'next/image'
import Cart from '../../shared/cart/cart'
import search from '@/app/localImages/UI/search-button.png'
import Link from 'next/link'
import { getProducts } from '@/app/lib/actions/getData'
import { useQuery } from '@tanstack/react-query'
import CartItemData from '../../shared/cartItemData/cartItemData'
import rightArrow from '@/app/localImages/UI/icon-right-arrow.png'
import leftArrow from '@/app/localImages/UI/left-1.png'

type Props = {}

const MobileMenu = (props: Props) => {
      const [mobileMenu,setMobileMenu]=useState<boolean>(false);
      const [mobileSearchModal,setMobileSearchModal]=useState<boolean>(false)
      const [footwearState,setFootWearState]=useState<boolean>(false);
      const [menswearState,setMensWearState]=useState<boolean>(false);
      const [searchInfo,setSearchInfo]=useState<any>('')
      const searchRef=useRef<any>('');
      const {data}=useQuery({
        queryKey:['products'],
        queryFn:()=>getProducts(),
        staleTime: 1000* 60 * 5
      })
      const searchData=()=>{
        let currData=data?.data;
        //setSearchInfo(searchRef.current.value)
        let searchTerm=currData.filter((vals:any)=>vals?.name?.includes(searchRef.current.value))
        setSearchInfo(searchTerm)

      }
      if(data!=undefined) console.log(data)
        console.log('Current Search Term: ', searchRef)
      console.log('Current Search Info: ', searchInfo)
  return (
    <div className='bg-white flex z-999 text-black' >
       
        <motion.button onClick={()=>setMobileMenu(!mobileMenu)} ><Image className='w-6 h-6' src={mobileMenuImg} alt='mobile menu' /></motion.button>
         <motion.div className='flex justify-start' >
                     {mobileMenu && <motion.div className='fixed 
                     border-2  h-full w-full p-6  top-4 left-2 bg-white' >
                      
                      <motion.div className='flex flex-col w-full  space-y-4  ' >
                       <motion.div className='flex w-1/2 justify-between' >
                        <div className='flex  w-1/4 justify-around ' >
                           <motion.button onClick={()=>setMobileMenu(!mobileMenu)} ><Image className='w-8 h-6' src={blackX} alt='mobile menu' /></motion.button>
                          {/* Morph button from mobile to BlackX */}
                          <motion.button className=' ' onClick={()=>{setMobileSearchModal(!mobileSearchModal)}} ><Image className='w-6 h-6' src={search} alt='Search Button' /></motion.button>
                          
                        </div>
                        <div className='flex justify-self-start' >
                            <Link className='text-center text-3xl ' href='/homeRedux' >ETQ.</Link>
                        </div>
                        </motion.div>
                        
                        <motion.div className='flex w-full' >
                           <hr className='w-full'/>

                          </motion.div>
                          {mobileSearchModal && <motion.div className='fixed text-black w-[600px] h-[850px] bg-white border-2 border-slate-200 top-0 z-999 ' >
                            <motion.div className='flex flex-col' >
                              <div className='flex self-end justify-around w-2/3' >
                                <Link className='flex justify-center self-center text-2xl pt-2 ' href='/homeRedux' >ETQ.</Link>
                                <motion.button className='flex justify-end  self-center pr-12 pt-4' onClick={()=>{setMobileSearchModal(!mobileSearchModal)}} ><Image className='w-6 h-6' src={blackX} alt='Search Button' /></motion.button>

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
                                {searchInfo && searchInfo?.map((vals:any)=><div className='flex w-full  overflow-hidden space-x-6 space-y-2 ' >
                                  <Link className='flex w-full justify-between space-x-2' href={`/collections/${vals.id}`} >
                                 
                                    <h1 className='flex justify-start self-center ' > {vals?.name} </h1>
                                    <Image className='w-20 h-20 justify-self-end flex self-end ' width={100} height={100} quality={100} src={vals.images[0]}  alt={vals.name} />
                                    </Link>
                                </div>)}

                              </div>
                              </motion.div>
                            
                            

                            </motion.div>}
                          {footwearState && <motion.div className='fixed  w-[600px] h-[850px] bg-white border-2 border-black top-0' >
                                      
                                      <div className='flex w-full  ' >
                                         <div className='flex justify-around w-3/5 ' >
                                          <button onClick={()=>{setFootWearState(!footwearState)}} >
                                             <Image className='' src={leftArrow} alt='left arrow' />
                                          </button>
                                           <button onClick={()=>{setMobileSearchModal(!mobileSearchModal)}} >
                                             <Image className='' src={search} alt='Search' />
                                            </button>  
                                            <h1 className='flex w-full justify-end self-center pr-8 text-xl ' >Footwear</h1>
                                         </div>
                                         
                                      </div>

                                      <hr className='flex w-full ' />
                                      <div className='flex flex-col space-y-4 p-4  ' >
                                        <Link href='/collections/footwear' >
                                        <div className='flex flex-col ' >
                                          <Image className='' height={100} width={100} src={data?.data[31]?.images[0]} alt='All Footwear' />
                                          <h1 className='' >All Footwear</h1>
                                        </div>
                                        </Link>
                                        <Link href='/collections/sneakers' >
                                        <div className='flex flex-col  ' >
                                          <Image className='' height={100} width={100} src={data?.data[10]?.images[0]} alt='Sneakers' />
                                          <h1 className='' >Sneakers</h1>
                                        </div>
                                        </Link>
                                        <Link href='/collections/loafers' >
                                         <div className='flex flex-col ' >
                                          <Image className='' height={100} width={100} src={data?.data[23]?.images[0]} alt='loafers' />
                                            <h1 className='' >Loafers</h1>
                                           </div>
                                        </Link>
                                        <Link href='/collections/desert-boots' >
                                         <div className='flex flex-col ' >
                                          <Image className='' height={100} width={100} src={data?.data[35]?.images[0]} alt='desert-boots' />
                                          <h1 className='' >Desert Boots</h1>
                                           </div>
                                        </Link>
                                        <Link href='/collections/dressed-footwear' >
                                         <div className='flex flex-col ' >
                                          <Image className='' height={100} width={100} src={data?.data[24]?.images[0]} alt='dressed-footwear' />
                                          <h1 className='' >Dressed Footwear</h1>
                                           </div>
                                        </Link>
         
                                      </div>
                                    </motion.div>}
                            {menswearState && <motion.div className='fixed  w-[600px] h-[850px] bg-white border-2 border-black top-0' >
                              <div className='flex w-full    ' >
                                         <div className='flex justify-around self-end w-3/5 ' >
                                          <button onClick={()=>{setMensWearState(!menswearState)}} >
                                             <Image className='' src={leftArrow} alt='left arrow' />
                                          </button>
                                           <button onClick={()=>{setMobileSearchModal(!mobileSearchModal)}} >
                                             <Image className='' src={search} alt='Search' />
                                            </button>  
                                            <h1 className='flex w-full justify-end self-end pr-8' >Menswear</h1>
                                         </div>
                                         
                                      </div>
                                      <hr className='flex w-full ' />
                                      <div className='flex flex-col space-y-4 p-4 ' >
                                        <Link href='/collections/menswear' >
                                        <div className='flex flex-col ' >
                                          <Image className=''height={100} width={100}  src={data?.data[2]?.images[0]} alt='All Menswear' />
                                          <h1 className='' >All Menswear</h1>
                                        </div>
                                        </Link>
                                        <Link href='/collections/t-shirts' >
                                        <div className='flex flex-col ' >
                                          <Image className='' height={100} width={100} src={data?.data[3]?.images[0]} alt='T-Shirts' />
                                          <h1 className='' >T-Shirts</h1>
                                          
                                        </div>
                                        </Link>
                                        <Link href='/collections/polo-shirts' >
                                         <div className='flex flex-col ' >
                                          <Image className='' height={100} width={100} src={data?.data[20]?.images[0]} alt='Polo-Shirts' />
                                          <h1 className='' >Polo-Shirts</h1>
                                           </div>
                                        </Link>
                                        <Link href='/collections/shirts' >
                                         <div className='flex flex-col ' >
                                          <Image className='' height={100} width={100} src={data?.data[40]?.images[0]} alt='shirts' />
                                          <h1 className='' >Shirts</h1>
                                           </div>
                                        </Link>
                                        <Link href='/collections/trousers' >
                                         <div className='flex flex-col ' >
                                          <Image className='' height={100} width={100} src={data?.data?.images[0]} alt='trousers' />
                                          <h1 className='' >Trousers</h1>
                                           </div>
                                        </Link>
         
                                      </div>
           
                                      </motion.div>}
                            <motion.div className='flex flex-wrap overflow-hidden space-x-4  ' >
                              <Link href='/collections/sneakers' >
                                <div className=' ' >
                                   <Image className=' ' width={100} height={100} src={data?.data[8]?.images[0]} alt='Sneakers' />
                                  <   h1 className='' >Sneakers</h1>
                                </div>
                              </Link>
                              <Link href='/collections/t-shirts' >
                              <div className='flex    flex-col' >
                                <Image className=' h-20 w-20' width={100} height={100} src={data?.data[0]?.images[0]} alt='T-Shirts' />
                                 <h1 className='' >T-Shirts</h1>
                              </div>
                              </Link>
                              <Link href='/collections/loafers' >
                                <div className='flex   flex-col' >
                                   <Image className='h-20 w-20' width={100} height={100} src={data?.data[24]?.images[0]} alt='Loafers' />
                                  <   h1 className='' >Loafers</h1>
                                </div>
                              </Link>
                              <Link href='/collections/trousers' >
                                <div className='flex  flex-col' >
                                   <Image className='h-20 w-20' width={100} height={100} src={data?.data[7]?.images[0]} alt='Trousers' />
                                  <   h1 className='' >Trousers</h1>
                                </div>
                              </Link>
                              <Link href='/collections/dressed-footwear' >
                                <div className='flex flex-col' >
                                   <Image className='h-20 w-20' width={100} height={100} src={data?.data[30]?.images[0]} alt='dressed-footwear' />
                                  <   h1 className='' >Dressed Footwear</h1>
                                </div>
                              </Link>
                              <Link href='/collections/shirts' >
                                <div className='flex flex-col' >
                                   <Image className='h-20 w-20' width={100} height={100} src={data?.data[20]?.images[0]} alt='Shirts' />
                                  <   h1 className='' >Shirts</h1>
                                </div>
                              </Link>
                              <Link href='/collections/desert-boots' >
                                <div className='flex  flex-col' >
                                   <Image className='h-20 w-20' width={100} height={100} src={data?.data[35]?.images[0]} alt='desert-boots' />
                                  <   h1 className='' >Desert Boots</h1>
                                </div>
                              </Link>
                              <Link href='/collections/polo-shirts' >
                                <div className='flex  flex-col' >
                                   <Image className='h-20 w-20' width={100} height={100} src={data?.data[21]?.images[0]} alt='Polo Shirts' />
                                  <   h1 className='' >Polo-Shirts</h1>
                                </div>
                              </Link>
                              </motion.div>
                      
                        </motion.div>
                        <motion.div className='py-4' >
                              <hr className='w-full' />
                          </motion.div>
                          <motion.div className=' flex flex-col w-full space-y-4 ' >
                            <div className='flex justify-between ' >
                                <button className='' onClick={()=>setFootWearState(!footwearState)}  >
                                    Footwear
                                </button>
                                <button className='w-6 h-6' onClick={()=>setFootWearState(!footwearState)} >
                                  <Image  src={rightArrow} alt='right arrow' />
                                </button>
                            </div>
                            <div className='flex justify-between ' >
                                <button className='' onClick={()=>setMensWearState(!menswearState)} >
                                  Menswear
                                </button>
                                <button className='w-6 h-6' onClick={()=>setMensWearState(!menswearState)} >
                                  <Image src={rightArrow} alt='right arrow' />
                                </button>
                            </div>
                            <div className='flex' >
                                <Link href='/collections/sales' >Spring Sale</Link>
                            </div>

                            </motion.div>
                            <motion.div className='py-4' >
                                <hr className='w-full' />
                              </motion.div>

                               <motion.div className=' flex flex-col space-y-4' >
                                 <Link href='/' className=''  >Shipping &amp; Delivery</Link>
                                 <Link href='/' className='' >Returns &amp; Exchanges</Link>
                                 <Link href='/' className='' >Size Guide</Link>
                                 <Link href='/' className=''>Product Care</Link>
                                 <Link href='/' className=''>All Topics & Customer Care</Link>
                                </motion.div>
                                  
                               <motion.div className='py-4' >
                                <hr className='w-full' />

                                </motion.div>   
                                 <motion.div className='flex justify-self-center w-1/2 h-1/3 ' >
                                  {data!=undefined &&  <Image className=' w-full h-full ' width={100} height={100} quality={100} src={data?.data[19]?.images[0]} alt='Spring Sale' />}
                                     
                                  </motion.div>
                                  <motion.div className='flex flex-col  justify-self-center space-y-4 pt-4 ' >
                                    <div className='bg-black w-6 h-6 flex self-center ' ></div>
                                    <h1 className='' >ETQ Amsterdam</h1>
                                    <h3 className='' >+111 11 11 11111</h3>
                                       <Link className='text-center'  href='/'>Email Us</Link>
                                    </motion.div>
                                         
                                  

                        </motion.div>}
                </motion.div>
        </div>
  )
}

export default MobileMenu