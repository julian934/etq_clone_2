'use client'
import React,{useEffect, useState,useId,useRef,useContext} from 'react'
import * as motion from 'motion/react-client'
import Image from 'next/image'
import {AnimatePresence} from "motion/react"
import Link from 'next/link'
import Cart from '../../shared/cart/cart'
import { useOutsideClick } from '../../hooks/use-outside-click'
import { StoreStateContext } from '@/app/lib/context/storeContextRedux'
import { signIn } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import mobileMenuImg from '@/app/localImages/UI/mobile-menu.png'
import blackX from '@/app/localImages/UI/black-x.png'
import search from '@/app/localImages/UI/search-button.png'
import MobileMenu from '../mobileMenu/mobileMenu'
import MobileSearch from '../mobileSearch/mobileSearch'
import { getProducts } from '@/app/lib/actions/getData'
type Props = {}

const NavBar = (props: Props) => {
  const [active,setActive]=useState<any>(null);
  const [currUser,setCurrUser]=useState<any>(null);
    const [mobileMenu,setMobileMenu]=useState<boolean>(false);
    const [deskMenu,setDeskMenu]=useState<boolean>(false);
    const [footWear,setFootWear]=useState<boolean>(false);
    const [mensWear, setMensWear]=useState<any>(null);
    const [searchModal,setSearchModal]=useState<any>(null);
    const [serviceModal, setServiceModal]=useState<any>(null);
    const [accountModal,setAccountModal]=useState<any>(null);
     const [searchInfo,setSearchInfo]=useState<any>('')
    const [login,setLogin]=useState<any>(null);
    const [mobileSearchModal,setMobileSearchModal]=useState<boolean>(false)
    const ref=useRef<HTMLDivElement>(null);
    const id=useId();
    const emailRef=useRef<any>();
    const passRef=useRef<any>();
    const searchRef=useRef<any>();
      const ctx=useContext(StoreStateContext);
      const currData:any=ctx.userState;
    const {data}=useQuery({
      queryKey:['cart data'],
      queryFn:()=>ctx.cartData(),
      staleTime:1000 * 60 * 5
    })
     const {data:products}=useQuery({
                queryKey:['products'],
                queryFn:()=>getProducts(),
                staleTime: 1000* 60 * 5
              })
   
    useEffect(()=>{
      if(currData!=undefined){
        const finData: any =currData? currData: null;
        console.log('curr data: ', currData)
        setCurrUser(finData)
      }
      function onKeyDown(event: KeyboardEvent) {
        if (event.key === "Escape") {
          setActive(false);
        }
      }
      if(active && typeof active =='object'){
        document.body.style.overflow='hidden';
      }else{
        document.body.style.overflow='auto';
      }
      window.addEventListener("keydown",onKeyDown);
      return ()=>window.removeEventListener("keydown",onKeyDown);
    },[active,currData]);

    const searchData=()=>{
      let currData=products?.data;
      //setSearchInfo(searchRef.current.value)
      let searchTerm=currData.filter((vals:any)=>vals?.name?.includes(searchRef.current.value))
      setSearchInfo(searchTerm)

    }

    useOutsideClick(ref,()=>setActive(null));
    const variants = {
      hidden: (direction:any) => ({
        opacity: 0,
        //y: direction === 1 ? 300 : -300
      }),
      visible: { opacity: 1, y: 0 }
    }
    const hoverVariants = {
      hidden: (direction:any) => ({
        opacity: 0,
        x: direction === 1 ? -300 : 300
      }),
      visible: { opacity: 1, x: 0 }
    }
    ctx.cartState
    ctx.cartState && console.log("Current Cart State: ", ctx.cartState);
    if(data!=undefined) console.log("Current Data: ", data)
      console.log("Current Data: ", currUser)
  return (
    <motion.div className=' flex flex-col border-2 border-slate-200 justify-between w-full p-4 z-100 ' >
         <AnimatePresence>
        {active  && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {mensWear  && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {searchModal  && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {serviceModal  && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {accountModal  && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active  ? (
          <div className="fixed top-8 left-6 inset-0  grid place-items-start z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout 
             
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }} 
              className="flex absolute top-2 right-2  items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <h1>Close</h1>
            </motion.button>
            <motion.div
            initial="hidden"
             variants={variants}
             animate={active?"visible":"hidden"}
             onHoverEnd={()=>setActive(!active)}
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[1000px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900  overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
               
              </motion.div>
              <div className=' flex flex-col bg-white h-[300px] ' >
                 <div className='flex ' >
                 <motion.div className='flex w-28 self-center ' >
               <Link href='/homeRedux' > <h1 className='text-3xl text-center tracking-widest' >ETQ.</h1></Link>
              
            </motion.div>
            <motion.div className='flex flex-col self-center  w-32'
              
              onHoverStart={()=>{
                !active && setActive(!active) 
              }}
             
               >
                <Link className='' href='/collections/footwear' >Footwear</Link>
                <motion.div className='flex w-3/5   bg-slate-200 z-100' initial="visible" variants={hoverVariants} animate={active?"visible":"hidden"}  >
                              <hr/>
                            </motion.div>
                
            </motion.div>
            <motion.div className='flex self-center  w-32'
              
              onHoverStart={()=>{
                !mensWear && setMensWear(!mensWear)
              }}
              
               >
                 
                 <Link className='' href='/collections/menswear' >Menswear</Link>
            </motion.div>
            <motion.div className='flex self-center  w-32' >
                <Link className='' href='/collections/sales' >Spring Sale</Link> 
            </motion.div>
                 </div>
                <div className='flex' >
                <div className='flex justify-around items-start p-4  w-2/3' >
                    <div className='flex flex-col space-y-4' >
                      <h1 className='text-xl' >Type </h1>
                         <Link href='/collections/all/footwear' >All Footwear</Link> 
                         <Link  href='/collections/sneakers'>Sneakers</Link> 
                         <Link href='/collections/loafers' >Loafers</Link>
                         <Link href='/collections/desert-boots' >Desert Boots</Link>
                         <Link href='/' >Runners</Link>
                         <Link href='//collections/dressed-footwear'>Dressed Footwear</Link>
                         <Link href='/'>Sandals</Link>    
                      </div>  
                      <div className='flex flex-col space-y-4' >
                        <h1 className='text-xl' >Collections</h1>
                        <Link href='/' >White Sneakers</Link>
                        <Link href='/' >Black Sneakers</Link>
                        <Link href='/' >Suede Footwear</Link>
                        <Link href='/' >Favorites</Link>
                        <Link href='/' >Spring Sales</Link>
                        <Link href='/' >Shoe Care</Link>
                      </div>
                      <div className='flex flex-col space-y-4 ' >
                          <h1 className='text-xl' >Material</h1>
                          <Link  href='/'>Full Grain Leather</Link>
                          <Link href='/' >Mediterranean Suede</Link>
                          <Link href='/' >Nubuck leather</Link>
                          <Link href='/' >Premium Nappa</Link>
                          <Link href='/' >Premium Suede</Link>
                      </div>
                     <div>

                     </div>
                     <div>

                     </div>
                </div>
                <div className='' >
                  <motion.div>
              <Image src='' alt='' />
              <h3 className='' >LT 03 Premium Nappa White</h3>
              <Link href='/' >Shop Now</Link>
              </motion.div>
                </div>
                <div className='' >
                  <motion.div>
                <Image src='' alt='' />
                <h3 className='' >Deluxe Cleaning Kit</h3>
              <Link href='/' >Shop Now</Link>
              </motion.div>
                </div>
                </div>
                
                

              </div>
             
          
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {mensWear  ? (
          <div className="fixed top-8 left-6 inset-0  grid place-items-start z-[110]">
            <motion.button
              key={`button-${active?.title}-${id}`}
              layout 
             
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }} 
              className="flex absolute top-2 right-2  items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setMensWear(null)}
            >
              <h1>Close</h1>
            </motion.button>
            <motion.div
            initial="hidden"
             variants={variants}
             animate={mensWear?"visible":"hidden"}
            onHoverEnd={()=>{
              mensWear && setMensWear(!mensWear)
            }}
              layoutId={`card-${active?.title}-${id}`}
              ref={ref}
              className="w-full max-w-[1000px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900  overflow-hidden"
            >
              <motion.div layoutId={`image-${active?.title}-${id}`}>
               
              </motion.div>
              <div className=' flex flex-col bg-white h-[300px] ' >
                 <div className='flex ' >
                 <motion.div className='flex w-28 self-center ' >
               <Link href='/' > <h1 className='text-3xl text-center tracking-widest' >ETQ.</h1></Link>
              
            </motion.div>
            <motion.div className='flex flex-col self-center  w-32'
              
              onHoverStart={()=>{
                !active && setActive(!active)
              }}
             
               >
                <Link className='' href='/collections/footwear' >Footwear</Link>
                
            </motion.div>
            <motion.div className='flex flex-col self-center  w-32'
              
              onHoverStart={()=>{
                !mensWear && setMensWear(!mensWear)
              }}
              
               >
                 
                 <Link className='' href='/collections/menswear' >Menswear</Link>
                  <motion.div className='flex w-3/5   bg-slate-200 z-100' initial="visible" variants={hoverVariants} animate={mensWear?"visible":"hidden"}  >
                              <hr/>
                            </motion.div>
            </motion.div>
            <motion.div className='flex self-center  w-32' >
                <Link className='' href='/collections/sales' >Spring Sale</Link> 
            </motion.div>
                 </div>
                <div className='flex  text-black ' >
                <div className='flex  text-black  justify-around items-start p-4  w-2/3' >
                    <div className='flex  text-black  flex-col space-y-4' >
                      <h1 className='text-xl' >Type </h1>
                         <Link href='/collections/all/menswear' >All Menswear</Link> 
                         <Link  href='/collections/t-shirts'>T-Shirts</Link> 
                         <Link href='/collections/polo-shirts' >Polo Shirts</Link>
                         <Link href='/' >Sweaters</Link>
                         <Link href='/collections/trousers' >Trousers</Link>
                         <Link href='/'>Multi-Packs</Link>
                         <Link href='/'>Socks</Link>    
                      </div>  
                      <div className='flex flex-col  text-black  space-y-4' >
                        <h1 className='text-xl' >Collections</h1>
                        <Link href='/' >No Show Socks</Link>
                        <Link href='/' >Regular Socks</Link>
                        <Link href='/' >Oversized Shirts</Link>
                        <Link href='/' >Multi-Packs</Link>
                        <Link href='/' >Spring Sales</Link>
                        
                      </div>
                      <div className='flex   text-black  flex-col space-y-4 ' >
                          <h1 className='text-xl' >Material</h1>
                          <Link  href='/'>American Fleece</Link>
                          <Link href='/' >Italian Fleece</Link>
                          <Link href='/' >Mercerized Pima Cotton</Link>
                          <Link href='/' >Pique Knit</Link>
                          <Link href='/' >Punti di Roma</Link>
                      </div>
                     <div>

                     </div>
                     <div>

                     </div>
                </div>
                <div className=' text-black ' >
                  <motion.div>
              <Image src='' alt='' />
              <h3 className='' >T-Shirts</h3>
              <p className='' >Minimalist luxury to an everyday essential.</p>
              <Link href='/' >Shop Now</Link>
              </motion.div>
                </div>
                <div className=' text-black ' >
                  <motion.div>
                <Image src='' alt='' />
                <h3 className='' >All Menswear</h3>
                <p className='' >Where being dressed is made comfortable.</p>
              <Link href='/' >Shop Now</Link>
              </motion.div>
                </div>
                </div>
                
                

              </div>
             
            
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {searchModal  ? (
          <div className="fixed top-8 left-6 inset-0  grid place-items-start z-[110]">
            <motion.button
              key={`button-${active?.title}-${id}`}
              layout 
             
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }} 
              className="flex absolute top-2 right-2  items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setSearchModal(null)}
            >
              <h1>Close</h1>
            </motion.button>
            <motion.div
            initial="hidden"
             variants={variants}
             animate={searchModal?"visible":"hidden"}
            onHoverEnd={()=>setSearchModal(!searchModal)}
              layoutId={`card-${active?.title}-${id}`}
              ref={ref}
              className="w-full  text-black   h-full md:h-fit md:max-h-[45%]  flex flex-col bg-white dark:bg-neutral-900  overflow-hidden"
            >
              <motion.div layoutId={`image-${active?.title}-${id}`}>
               
              </motion.div>
              <div className=' flex flex-col bg-white h-[300px] ' >
                 <div className='flex ' >
                 <motion.div className='flex w-28 self-center ' >
               <Link href='/' > <h1 className='text-3xl text-center tracking-widest' >ETQ.</h1></Link>
              
            </motion.div>
            <motion.div className='flex self-center  w-32'
              
              onHoverStart={()=>setActive(!active)}
             
               >
                <button className='' onClick={()=>setActive(!active)} >Footwear</button>
                
            </motion.div>
            <motion.div className='flex  text-black  self-center  w-32'
              
              onHoverStart={()=>setMensWear(!mensWear)}
              
               >
                 
                 <button className='' onClick={()=>setMensWear(!active)} >Menswear</button>
            </motion.div>
            <motion.div className='flex  text-black  self-center  w-32' >
                <Link className='' href='/collections/sales' >Spring Sale</Link> 
            </motion.div>
            <motion.div className='flex   justify-between w-96' >
                  <motion.button onClick={()=>setSearchModal(!searchModal)} className='flex self-center' >
                      Search
                  </motion.button>
                  <motion.button onClick={()=>setServiceModal(!serviceModal)} className='flex self-center' >
                     Service
                  </motion.button>
                  <motion.button onClick={()=>setAccountModal(!accountModal)} className='flex self-center' >
                    My Account
                  </motion.button>
                  <Cart/>
            </motion.div>
           
                 </div>
                                
              </div>
             <div className='flex flex-col text-black bg-white justify-self-start ' >
             <div className='flex w-full py-4' >
                                  <hr className='w-full ' />
                              </div>
                              <div className='flex px-4 w-full '  >
                                <input className='w-full' onChange={searchData} placeholder='Start typing what you&apos;re looking for ...' ref={searchRef} />

                              </div>
                              <div className='flex w-full py-4' >
                                  <hr className='w-full ' />
                              </div>
                <div className='flex flex-wrap w-full space-x-2' >
                {searchInfo && <h1 className='flex text-2xl px-2 ' >Products: </h1>}
                                {searchInfo && searchInfo?.map((vals:any)=><div className=' w-full  overflow-hidden space-x-6 space-y-2 ' >
                                  <Link className='flex w-full justify-between space-x-2' href={`/collections/${vals.id}`} >
                                 
                                    <h1 className='flex justify-start self-center ' > {vals?.name} </h1>
                                    <Image className='w-20 h-20 justify-self-end flex self-end ' width={100} height={100} quality={100} src={vals.images[0]}  alt={vals.name} />
                                    </Link>
                                </div>)}
                </div>
              <div className='flex flex-row text-black justify-around pb-4' >
                  <div className='flex flex-col space-y-4 ' >
                     <h1 className='' >Info</h1>
                      <Link className='' href='/' >Shipping &amp; Delivery</Link>
                      <Link className='' href='/' >Returns &amp; Exchanges</Link>
                      <Link className='' href='/' >Size Guide</Link>
                      <Link  className=' ' href='/'>Product Care</Link>
                      <Link className='' href='/' >All Topics &amp; Customer Care</Link>
                  </div>
                 <div className='flex flex-col space-y-4 ' >
                  <h1 className='' >Shop</h1>
                    <Link className='' href='/collections/all/footwear' >Shoes</Link>
                    <Link className=''  href='/collections/sneakers' >Sneakers</Link>
                    <Link className=''  href='/collections/loafers' >Loafers</Link>
                    <Link className='' href='/'  >Espadrilles</Link>  
                    <Link className='' href='/' >Sandals</Link> 
                    <Link className='' href='/' >Sale</Link>
                 </div>
                 <div className='flex flex-col space-y-4 ' >
                  <h1> Featured</h1>
                    <Link className='' href='/' >Loafers</Link>
                    <Link className='' href='/' >Premium Suede</Link>
                    <Link className='' href='/' >Essence</Link>
                    <Link className='' href='/' >Premium Nappa</Link>
                 </div>
              </div>

             </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {serviceModal  ? (
          <div className="fixed top-8 left-6 inset-0  grid place-items-start z-[110]">
            <motion.button
              key={`button-${active?.title}-${id}`}
              layout 
             
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }} 
              className="flex absolute top-2 right-2  items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setServiceModal(null)}
            >
              <h1>Close</h1>
            </motion.button>
            <motion.div
            initial="hidden"
             variants={variants}
             animate={serviceModal?"visible":"hidden"}
            onHoverEnd={()=>setServiceModal(!serviceModal)}
              layoutId={`card-${active?.title}-${id}`}
              ref={ref}
              className="w-full   h-full md:h-fit md:max-h-[25%]  flex flex-col bg-white dark:bg-neutral-900  overflow-hidden"
            >
              <motion.div layoutId={`image-${active?.title}-${id}`}>
               
              </motion.div>
              <div className=' flex flex-col bg-white h-[300px] ' >
                 <div className='flex ' >
                 <motion.div className='flex w-28 self-center ' >
               <Link href='/' > <h1 className='text-3xl text-center tracking-widest' >ETQ.</h1></Link>
              
            </motion.div>
            <motion.div className='flex self-center  w-32'
              
              onHoverStart={()=>setActive(!active)}
             
               >
                <button className='' onClick={()=>setActive(!active)} >Footwear</button>
                
            </motion.div>
            <motion.div className='flex self-center  w-32'
              
              onHoverStart={()=>setMensWear(!mensWear)}
              
               >
                 
                 <button className='' onClick={()=>setMensWear(!active)} >Menswear</button>
            </motion.div>
            <motion.div className='flex self-center  w-32' >
                <Link className='' href='/collections/sales' >Spring Sale</Link> 
            </motion.div>
            <motion.div className='flex   justify-between w-96' >
                  <motion.button onClick={()=>setSearchModal(!searchModal)} className='flex self-center' >
                      Search
                  </motion.button>
                  <motion.button onClick={()=>setServiceModal(!serviceModal)} className='flex self-center' >
                     Service
                  </motion.button>
                  <motion.button onClick={()=>setAccountModal(!accountModal)} className='flex self-center' >
                    My Account
                  </motion.button>
                 
            </motion.div>
           
                 </div>
                                
              </div>
             <div className='flex flex-col self-start bg-white text-black w-full p-4  ' >
              
              <div className='flex flex-row justify-around w-full  ' >
                  <div className='flex flex-col space-y-4' >
                     <h1 className='text-xl' >Contact</h1>
                      <Link className='' href='/' >Email us here</Link>
                      <Link className='' href='/' >{/* Phone Number*/}</Link>
                  </div>
                 <div className='flex flex-col space-y-4' >
                  <h1 className='text-xl' >Information</h1>
                    <Link className='' href='/' >Shipping & Delivery</Link>
                    <Link className=''  href='/' >Returns & Exchanges</Link>
                    <Link className=''  href='/' >Size guide</Link>
                    <Link className='' href='/'  >Care guide</Link>  
                 
                 </div>
                 <div className='flex flex-col space-y-4 ' >
                  <h1 className='text-xl' > Frequently asked questions</h1>
                    <Link className='' href='/' >Do I need an account to place an order?</Link>
                    <Link className='' href='/' >How do I return or exchange?</Link>
                    <Link className='' href='/' >Do you ship to my country?</Link>
                    <Link className='' href='/' >How much does the delivery cost?</Link>
                 </div>
              </div>

             </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {accountModal  ? (
          <div className="fixed top-8 left-6 inset-0  grid place-items-start z-[110]">
            <motion.button
              key={`button-${active?.title}-${id}`}
              layout 
             
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }} 
              className="flex absolute top-2 right-2  items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setAccountModal(null)}
            >
              <h1>Close</h1>
            </motion.button>
            <motion.div
            initial="hidden"
             variants={variants}
             animate={accountModal?"visible":"hidden"}
            onHoverEnd={()=>setAccountModal(!accountModal)}
              layoutId={`card-${active?.title}-${id}`}
              ref={ref}
              className="w-1/4 md:justify-self-end  md:mr-8 h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900  overflow-hidden"
            >
              <motion.div layoutId={`image-${active?.title}-${id}`}>
               
              </motion.div>
              <div className=' flex flex-col bg-white h-[300px] ' >
                 <div className='flex flex-col justify-end' >
                
            <motion.div className='flex   justify-between w-96 p-4 ' >
                  <motion.button onClick={()=>setSearchModal(!searchModal)} className='flex self-center' >
                      Search
                  </motion.button>
                  <motion.button onClick={()=>setServiceModal(!serviceModal)} className='flex self-center' >
                     Service
                  </motion.button>
                  <motion.button onClick={()=>setAccountModal(!accountModal)} className='flex self-center' >
                    My Account
                  </motion.button>
                 
            </motion.div>
            {!login && <motion.div className='flex bg-white  flex-col justify-between space-y-4 ' >
              
              
              <div className='flex flex-col w-full justify-around self-end justify-end pt-12  p-2 space-y-8 ' >
              <h3 className='bg-white flex justify-center text-start py-4  text-sm ' >
                  Create an account or log in to view your orders, return or adjust your personal information.
              </h3>
                <hr className='flex w-full bg-slate-200   ' />
                <div className='flex flex-row justify-around  ' >
                  <div className='-mt-4' >
                  <Link className='w-1/4 -mt-8 ' href='/sign-up' >Create account</Link>
                  </div>
                   
               
              
                 <button className='text-white text-center flex self-center justify-center ' onClick={()=>setLogin(!login)} > 
                  
                  <motion.div className='bg-black w-28 h-12 flex justify-center self-center -mt-6' >
                  <h1 className='flex text-center self-center ' >Login</h1>
                  </motion.div>
                  </button>
                
                </div>
              
                
              </div>
            </motion.div>}
              {login && <motion.div className='flex flex-col  p-4 ' >
                <h1 className='' >Email*</h1>
                <input className='border-2 w-full h-12'  ref={emailRef}  />
                <h1 className='' >Pass*</h1>
                <input className='border-2 w-full h-12' ref={passRef} />
                <hr className='w-28' />
                <div className='flex flex-row self-center w-full justify-around ' >
                  <Link className='justify-start' href='/' >Lost your password?</Link>
                 
                   <button className='text-white text-center flex self-center justify-center ' onClick={()=>signIn('credentials',{username:emailRef.current.value,password:passRef.current.value,callbackUrl:'/homeRedux'})} > 
                    
                    <motion.div className='bg-black w-28  h-12 flex justify-center self-center ' >
                      <h1 className='flex text-center self-center ' >Login</h1>
                    </motion.div>
                    </button>
                 
                </div>
              </motion.div> }
           
                 </div>
                                
              </div>
             
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
     
        <motion.div className='flex self-center px-4 flex-row justify-between  max-sm:hidden w-full h-16' >
            {/* desktop nav */}
            <motion.div className='flex justify-around  w-1/3' >
            <motion.div className='flex w-28 self-center ' >
               <Link href='/homeRedux' > <h1 className='text-3xl text-center tracking-widest' >ETQ.</h1></Link>
              
            </motion.div>
            <motion.div className='flex self-center  w-32'
              
              onHoverStart={()=>{
                !active && setActive(!active)
              }}
             
               >
                <Link className='' href='/collections/footwear' >Footwear</Link>
                
            </motion.div>
            <motion.div className='flex self-center  w-32'
              
              onHoverStart={()=>{
                !mensWear && setMensWear(!mensWear)
              }}
              
               >
                 
                 <Link className='' href='/collections/menswear' >Menswear</Link>
            </motion.div>
            <motion.div className='flex self-center  w-32' >
                <Link className='' href='/collections/sales' >Spring Sale</Link> 
            </motion.div>
            </motion.div>
            
            <motion.div className='flex   justify-between w-96' >
                  <motion.button onClick={()=>setSearchModal(!searchModal)} className='flex self-center' >
                      Search
                  </motion.button>
                  <motion.button onClick={()=>setServiceModal(!serviceModal)} className='flex self-center' >
                     Service
                  </motion.button>
                  <motion.button onClick={()=>setAccountModal(!accountModal)} className='flex self-center' >
                    My Account
                  </motion.button>
                   {/* <div className='flex flex-col self-center' >
                      <motion.button onClick={()=>{}} className='flex rounded-2xl w-8 justify-center bg-black gap-4' >
                                <h1 className='text-white flex' >{currData? currData?.data?.userCart.length:0}</h1>
                           </motion.button>
                  </div>*/}
                  
                  <Cart/>
            </motion.div>
        </motion.div>
        <motion.div className='flex justify-between md:hidden' >
            {/*mobile nav */}
            <motion.div className='flex  w-1/4 justify-around px-4 ' >
               
               <MobileMenu/>
                {/*<motion.button onClick={()=>setMobileMenu(!mobileMenu)} ><Image className='w-6 h-6' src={mobileMenuImg} alt='mobile menu' /></motion.button> */}
               
                {/* <motion.button onClick={()=>{setMobileSearchModal(!mobileSearchModal)}} ><Image className='w-6 h-6' src={search} alt='Search Button' /></motion.button>*/}
                <MobileSearch/>
            </motion.div>
            <motion.div className='flex px-4 mt-2  ' >
              <h1 className='text-2xl' >ETQ.</h1>

            </motion.div>
            <motion.div className='flex px-4 w-1/4 justify-end  ' >
                
                <Cart/>
            </motion.div>
            
        </motion.div>
       
        <motion.div className='' >
             {deskMenu && <motion.div className='flex ' >
                    
                </motion.div>}
        </motion.div>
       
             {/*footWear && <motion.div className='absolute z-20 bg-white z-10 md:w-[600px] md:h-[400px] p-8 border-2  ' >
                    <h1 className='' > Active!</h1>
                </motion.div>*/}
        
        
       
       
        <motion.div className='' >
             {serviceModal && <motion.div className='flex ' >
                    
                </motion.div>}
        </motion.div>
        <motion.div className='' >
             {accountModal && <motion.div className='flex ' >
                    
                </motion.div>}
        </motion.div>
        </motion.div>
  )
}

export default NavBar