'use client'
import React,{useState,useEffect,useRef} from 'react'
import { useQuery } from '@tanstack/react-query'
import { getItem } from '@/app/lib/database/connections'
import NavBar from '@/app/components/ui/navRedux/navbar'
import { useSession } from 'next-auth/react'
import { getUser } from '@/app/lib/database/connections'
import Footer from '@/app/components/ui/footer/footer'
import Image from 'next/image'
import * as motion from 'motion/react-client'
import { useContext } from 'react'
import { StoreStateContext } from '@/app/lib/context/storeContext'
import { updateUser } from '@/app/lib/database/connections'
import { getItemPrice } from '@/app/lib/database/connections'
import blackUncheck from '@/app/localImages/UI/black-uncheck.png'
import leftArrow from '@/app/localImages/UI/left-1.png'
import leftArrow2 from '@/app/localImages/UI/left-2.png'
import box from '@/app/localImages/UI/black-box.png'
import plus from '@/app/localImages/UI/black-plus.png'
import minus from '@/app/localImages/UI/black-minus.png'
import square from '@/app/localImages/UI/black-square.png'
import whiteArrow from "@/app/localImages/UI/white-right-arrow.png"
import arrowCircle from '@/app/localImages/UI/arrow-circle.png'


type Props = {id:string}

const Item = ({params}:{params: Props | undefined}) => {
   const [priceData,setPriceData]=useState<any>()
  const [featureState,setFeatureState]=useState<any>(null);
  const [descriptionState,setDescriptionState]=useState<any>(null);
  const [materialState,setMaterialState]=useState<any>(null);
  const [sizeState,setSizeState]=useState<any>(null);
  const {data}=useQuery({
    queryKey:['Items'],
    queryFn:()=>getItem(params?.id),
    staleTime:1000 * 60 * 5
  })
  const {data:session}=useSession();
  console.log(session?.user?.name)
  const ctx=useContext(StoreStateContext);
  //const [currUserData,setCurrUserData]=useState<any>()
  const { data: currUserData } = useQuery({
    queryKey: ['User', session?.user?.name],
    queryFn: () => (session?.user?.name ? getUser(session.user.name) : Promise.resolve(null)),
    enabled: !!session?.user?.name, // Prevents fetching if session user is undefined
  })
  
  const userTest=ctx.userState
   useEffect(()=>{
        const fetchPrice=async()=>{
          if(data && !priceData){
            try {
              let price=await getItemPrice(`${data?.data?.default_price}`);
            if(price!=undefined){
              let currPrice=Intl.NumberFormat("en-US",{
                style:"currency",
                currency:"USD",
                maximumFractionDigits:2
              }).format(price.unit_amount/100)
              setPriceData(currPrice)
            }
            } catch (error) {
              console.error("Error fetching price:", error);
            }
            
          }
        }
      priceData==undefined && fetchPrice() 
      
      },[data,priceData]);
  const handleAddToCart=(id:string | null | undefined,price:string | null | undefined)=>{
    console.log("Current ID: ", id)
    console.log("Current Price: ", price)
    ctx.addToCart(id,price)
    console.log("Calling updateUser with:", session?.user?.name, ctx.userState);
    if (session?.user?.name && ctx.userState) {
      updateUser(session.user.name, ctx.userState); // assuming name is being used as "username"
    }
  }

  if (data) console.log(data)
  if (session?.user?.name) console.log(session?.user?.name)
  if (currUserData) console.log(currUserData)

if(data!=undefined) console.log(data.data)
  if(session?.user?.name) console.log(session?.user?.name)
  if(currUserData!=undefined) console.log(currUserData)
    if(session?.user?.name) console.log("Current User: ", ctx.userState)
      console.log("current user: ", ctx.userState)
  return (
    <div className='bg-white text-black' >
      <div className='w-full' >
        <NavBar/>
      </div>
    
      <div className='flex max-sm:flex-col  md:min-h-[1000px] w-full px-4 ' >
        <div className='w-full  text-black' >
          <div className='flex  self-center  justify-around w-40' >
            <Image className='' src={leftArrow} alt='Back Arrow' />
               <hr className='origin-center rotate-90 w-28 bg-slate-200 flex self-center ' />
               <h1 className='flex self-center' >Parent category</h1>
          </div>
            <div className='flex flex-wrap self-end  gap-2 justify-around ' >
               {data?.data?.images.length>1 && data?.data?.images?.map((items:any)=><Image className='flex w-1/3 ' width={100} height={100} quality={100} src={items} alt="Item Images" />)}
               {data?.data?.images?.length==1 && <Image className='flex w-2/3 ' width={300} height={300} quality={100} src={data?.data?.images[0]} alt="Item Images" />}
            </div>
        </div>
        <div className='relative absolute top-20 items-center w-1/2 max-sm:w-full space-y-4 p-4 ' >
             
            {/* Purchase info*/}
            <h1 className='text-center text-lg ' >{data?.data?.name}</h1>
            <h2 className='text-center' >{priceData}</h2>
            <div className='flex  justify-center' >
              <div className='' >
              <div>
                  {/* Color Modal */}
                 </div>
              <div>
                   {/*  Size Modal*/}
                </div>
              </div>
              <motion.div className='flex  flex-col justify-self-center  self-center space-y-4 ' >
                  <button className=' w-full h-12 bg-black text-white ' onClick={()=>handleAddToCart(data?.data?.id,data?.data?.default_price)} >Add to bag</button>
                  <button className='' onClick={()=>{}} >Perfect fit - stick to your usual size.</button>
                  <hr className='flex w-full ' />
              </motion.div>
            </div>
            <div className='flex  justify-around self-center ' >
              <Image className='h-10 w-10' src={box} alt='img1' />
              <div className='flex flex-col justify-between space-y-2' >
                 <h1 className='' >Same Day Shipment</h1>
                 <p>Info</p>
              </div>
              <Image className='h-10 w-10' src={blackUncheck} alt='img2' />

            </div>
            <div className='flex justify-around  self-center ' >
              <Image className='h-8 w-8' src={arrowCircle} alt='img1' />
              <div className='flex flex-col justify-between space-y-2 ' >
                 <h1 className='' >Easy Returns & Exchanges</h1>
                 <p>Info</p>
              </div>
              <Image className='h-10 w-10' src={blackUncheck} alt='img2' />

            </div>
            <motion.div className='flex flex-col  space-y-4 p-2' >
              <motion.div className='flex flex-col p-2' >
                <motion.div className='flex justify-between p-2' >
                <h1 className='' >Premium features</h1>
                <motion.button className='' onClick={()=>setFeatureState(!featureState)}  >
                  
                  {featureState? <Image className='' src={minus} alt='minus' />:<Image className='w-8 h-6' quality={100} width={100} height={100}src={plus} alt='Plus' />}
                </motion.button>
                </motion.div>
                
                {featureState?<motion.div className='flex flex-wrap  h-full ' >
                    <p className='flex   ' > {data?.data?.attributes}</p>
                </motion.div>:null}
              </motion.div>
              <motion.div className='flex flex-col p-2' >
                <motion.div className='flex justify-between p-2' >
                <h1 className='' >Description</h1>
                 <motion.button className=''onClick={()=>setDescriptionState(!descriptionState)}  >
                  
                  {descriptionState?<Image className='' src={minus} alt='minus' />:<Image className='w-8 h-6' quality={100} width={100} height={100}src={plus} alt='Plus' />}
                  </motion.button>
                </motion.div>
                {descriptionState?<motion.div className='flex  flex-wrap  h-full ' >
                    <p className='flex   ' > {data?.data?.description}</p>
                </motion.div>:null}
              </motion.div>
              <motion.div className='flex flex-col p-2' >
                <motion.div className='flex justify-between p-2' >
                <h1 className='' >Material info</h1>
                <motion.button className='' onClick={()=>setMaterialState(!materialState)} >
                  
                  {materialState?<Image className='' src={minus} alt='minus' />:<Image className='w-8 h-6'quality={100} width={100} height={100} src={plus} alt='Plus' />}
                </motion.button>
                </motion.div>
                {materialState?<motion.div className='flex  flex-wrap  h-full ' >
                    <p className='flex   ' > {data?.data?.marketing_features}</p>
                </motion.div>:null}
              </motion.div>
              <motion.div className='flex flex-col p-2' >
                <motion.div className='flex justify-between p-2' >
                <h1 className='' >Size & fit</h1>
                  <motion.button className='' onClick={()=>setSizeState(!sizeState)} >
                     
                     {sizeState?<Image className='' src={minus} alt='minus' />:<Image className='w-8 h-6' quality={100} width={100} height={100} src={plus} alt='Plus' />}
                    </motion.button>
                </motion.div>
                {sizeState?<motion.div className='flex  flex-wrap  h-full ' >
                    <p className='flex   ' > {data?.data?.statement_descriptor}</p>
                </motion.div>:null}
              </motion.div>
            </motion.div>
        </div>

      </div>
        <div className='flex w-full' >
           <Footer/>
          </div>
      </div>
  )
}

export default Item