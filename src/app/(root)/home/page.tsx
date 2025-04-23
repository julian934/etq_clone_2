"use client"
import React,{useState,useEffect} from 'react'
import NavBar from '@/app/components/ui/nav/navbar'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/app/components/ui/footer/footer'
//import { getPaymentIntent } from '@/app/lib/actions/getData'
import { useQuery } from '@tanstack/react-query'
import { useSession,signIn,signOut } from 'next-auth/react'
import { getProducts } from '@/app/lib/database/connections'
import banner from '../../localImages/banners/Classic.jpg'
import Favorites from '@/app/components/ui/favorites/favorites'
import { getTestData } from '@/app/lib/actions/getData'
import { testUsers } from '@/app/lib/actions/getData'
import Kings from '@/app/components/shared/kingscollection/kingscollection'
type Props = {} 

const Home = (props: Props) => {
  const [clientSecret,setClientSecret]=useState('');
  const [products, setProducts]=useState<any>([]);
  const {data,isError}=useQuery({
    queryKey:['products'],
    queryFn:getProducts,
    
})

useEffect(()=>{
   if(data!=undefined){
    console.log(data)
    const currData=data
    console.log(currData)
    setProducts(currData)
   }
},[data])
const {data:session}=useSession();
if(session){
  console.log(session)
}
console.log(data)
if(data){
  console.log(data)
}
if(products){
  console.log(products)
}
//console.log(data?.data)
   /* useEffect(()=>{
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: 5000 }), // Example amount in cents
          })
            .then((response) => response.json())
            .then((data) => setClientSecret(data.clientSecret));
            console.log(clientSecret)
    },[]);
    */
  return (
    <div className='flex md:grid md:grid-cols-3 md:grid-rows-4  bg-white w-full h-full max-md:flex-col z-40' >
      
        {/* Get options for sticking to top of viewport via tailwind.*/}
        
     
       <div className=' flex z-50 md:row-start-1 md:col-start-1 md:col-span-3 max-md:w-full md:w-full h-12 z-40 flex-row  ' >
              <NavBar/>
           </div>
        
      
      <div className='flex max-md:w-full max-md:h-screen md:h-full md:row-start-1 md:col-start-1 md:col-span-3  md:w-full  max-md:flex-col max-md:flex-wrap max-md:grid max-md:grid-cols-4 max-md:grid-rows-4 md:bg-white  max-sm:bg-black ' >
          <div className='flex max-md:h-full max-md:w-full max-md:h-screen max-md:col-start-1 max-md:col-span-4 md:w-2/3 md:h-full md:bg-white max-sm:bg-black ' >
            {/* Banner Image, alternating URLs, swap state after time intervals. Include transition.*/}
            {/* black and white overlay for image */}
            <Image className=' flex max-md:h-2/3 w-full max-md:w-full  md:h-full md:w-full' quality={100} width={100} height={100} src={banner} alt='Magisters Corner Banner Image' />
          </div>
          <div className='flex flex-col md:bg-white md:text-black md:border-2 md:border-black md:w-1/3 md:h-3/4 md:space-y-4 md:px-8  justify-center max-sm:row-start-3  max-md:bottom-12 max-md:self-end  max-sm:justify-center max-md:w-full max-md:h-20 max-sm:w-72 max-md:space-y-2  max-sm:self max-sm:px-4 z-20 ' >
            <h3 className='  max-md:text-xl max-sm:text-white max-md:w-full font-medium  md:text-2xl  ' >Fit for Royalty</h3>
            <h1 className='max-md:text-3xl max-sm:text-white max-md:w-full font-semibold  md:text-4xl ' >The new classics</h1>
            <h3 className=' max-md:text-md max-sm:text-white max-md:w-full max-md:w-full font-light md:text-lg  ' >Elevate your look.</h3>
            <Link className='max-md:text-sm max-sm:text-white max-md:w-full  font-extralight  md:text-md ' href='/' >Shop All</Link>
          </div>
      </div>
      <div className='flex max-sm:flex-col md:col-start-1 md:col-span-3 md:row-start-2 md:h-full max-h-30vh max-sm:grid max-sm:grid-cols-2 max-sm:grid-rows-2 md:bg-white md:flex-row max-sm:w-full max-sm:space-y-4 md:border-2 '>
        {/* Set to row on medium sizes and up, add pagination for selectors.*/}
        {/* mapped over product images for definitions. */}
        <div className=' flex max-sm:justify-center flex-col md:w-full md:h-1/2 md:self-center max-md:text-black pl-4 max-sm:col-start-1 max-sm:col-span-2 max-sm:row-start-1 max-sm:px-4' >
          {/* may need new image */}
          
          {/* <Image className='max-sm:h-full max-sm:w-full md:h-5/6 md:w-5/6' height={100} width={100} quality={100} src="https://files.stripe.com/links/MDB8YWNjdF8xUFMyMUFFTFdrSWllQWF4fGZsX3Rlc3RfY2VSRmdBWUVyU0hPVXB2TFFnUU5JWDBx00CtQnpezn" alt='' />
          <div className='flex flex-col max-sm:h-full' >
          <h2 className=' font-medium text-3xl ' >Classic Styles</h2>
          <h3 className=' font-light text-xl ' >You can't beat the classics.</h3>
           
          <Link className='font-extralight text-md ' href='/classics' >Read More</Link>
          </div>*/}
          <div className='flex flex-wrap w-full ' >
            {/*Categories */}
            <div className='flex w-full flex-row justify-between' >
              <h1 className='w-2/3 text-2xl  ' >Explore a selection of our wardrobe essentials.</h1> 
               <Link className='text-md' href="/" >Shop All</Link>
            </div>
            {/* Categories List */}
            <div className='flex flex-wrap w-full space-x-2 ' >
            <div className='flex flex-col w-60 h-60' >
               <Image className='flex ' src='/' quality={100} width={100} height={100} alt='Sneakers' /> 
               <div className='' >
                  <h1 className='' >Sneakers</h1>
                  <p className='' >Sneakers made like shoes.</p>
               </div>
            </div>
            <div className='flex flex-col w-60 h-60' >
               <Image className='' src='/' quality={100} width={100} height={100} alt='T-Shirts' />
               <div className='flex flex-col w-60 h-60' >
                  <h1 className='' >T-Shirts</h1>
                  <p className='' >Built for the long haul.</p>
               </div>
            </div>
            <div className='flex flex-col w-60 h-60' >
               <Image className='' src='/' quality={100} width={100} height={100} alt='Loafers' />
               <div className='flex flex-col w-60 h-60' >
                  <h1 className='' >Loafers</h1>
                  <p className='' >Intensified suede, utmost suppleness.</p>
               </div>
            </div>
             <div className='flex flex-col w-60 h-60' >
               <Image className='' src='/' quality={100} width={100} height={100} alt='Trousers' />
               <div className='' >
                  <h1 className='' >Trousers</h1>
                  <p className='' >A powerful silhouette and yet, they wear like pajama's.</p>
               </div>
             </div>
             <div className='flex flex-col w-60 h-60' >
               <Image className='' src='/' quality={100} width={100} height={100} alt='Dressed Footwear' />
               <div className='' >
                  <h1 className='' >Dressed Footwear</h1>
                  <p className='' >Tailored with the finest leathers.</p>
               </div>
             </div>
             <div className='flex flex-col w-60 h-60' >
               <Image className='' src='/' quality={100} width={100} height={100} alt='Shirts' />
               <div className='' >
                  <h1 className='' >Shirts</h1>
                  <p className='' >Endless comfort. You want to keep it on. </p>
               </div>
             </div>
             <div className='flex flex-col w-60 h-60' >
               <Image className='' src='/' quality={100} width={100} height={100} alt='Desert Boots' />
               <div className='' >
                  <h1 className='' >Desert Boots</h1>
                  <p className='' >Abrasion and slip resistance soles.</p>
               </div>
             </div>
             <div className='flex flex-col w-60 h-60' >
             <Image className='' src='/' quality={100} width={100} height={100} alt='Polo Shirts' />
             <div className='' >
                  <h1 className='' >Polo Shirts </h1>
                  <p className='' >Providing comfort without losing shape.</p>
               </div>
             </div>

            </div>
           
          </div>
           
          {/* */}
          <div className='flex' >
            {/* Shoes & Slogan*/}
            <div className='flex flex-col w-full ' >
              <div className='flex flex-row w-full space-x-2 p-2 self-center' >
              <Image  className='w-full h-full' src='/' quality={100} width={100} height={100} alt="Shoe Banner & Link 1" />
              <Image  className='max-sm:hidden w-full h-full ' src='/' quality={100} width={100} height={100} alt="Shoe Banner & Link 2" />
              </div>
             
              <div className='flex flex-col self-center w-1/3 space-y-4 ' >
                <Image className='w-20 h-20' src='/' quality={100} width={100} height={100} alt="Site Symbol" />
                <p className='flex ' >Our style never changes. It evolves. Continuously. Confident and comfortable, ETQ introduces the etiquette 
                  of artisan shoe crafting to today's sneaker world. 
                </p>
                <Link className='text-md text-center flex w-40 border-2 border-slate-100 h-10 text-center ' href="/" >
                  <div className='flex self-center justify-self-center px-4 ' >
                    <h1 className='' >Shop Footwear</h1>
                  </div>
                </Link>
                
               
              </div>
            </div>

          </div>
          <div className='flex flex-col px-4 ' >
            <div className='flex flex-row justify-between' >
            <h1 className='text-2xl' > Everyday Luxury </h1>
             <h1 className='text-lg' > Modal for changing data. {/* Find switch component */} </h1>
            </div>
            
            <div className='flex' >
                {/* Mapped Shoes on discount.  */}
                <h1 className='' >Mapped Stripe Products on sale</h1>
            </div>
          </div>
          <div className='flex flex-col w-full z-50' >
            <div className=' w-full px-4 ' >
               <Image className='w-full h-full' src='/' quality={100} width={100} height={100} alt="Item Shirt Banner 1" />
                <Image className=' max-sm:hidden ' src='/' quality={100} width={100} height={100} alt="Item Shirt Banner 2"   />
            </div>
            <div className=' flex flex flex-col self-center w-1/3 space-y-4' >
                <Image className='w-20 h-20' src='/' quality={100} width={100} height={100} alt='Site Symbol' />
                <p className='flex' >At our Dutch design studio, we focus on the things even the eye can't see, to build better. We create apparel
                  but approach it as product design. It makes all the difference. 
                </p>
                <Link className='text-md text-center flex w-40 border-2 border-slate-100 h-10 text-center ' href="/" >
                  <div className='flex self-center justify-self-center px-4 ' >
                    <h1 className='' >Shop Menswear</h1>
                  </div>
                </Link>
            </div>
          </div>
          <div className='flex flex-col space-y-4' >
            <div className='flex flex-row justify-between ' >
             <h1 className='flex text-2xl' >Wardrobe Essentials</h1>
             <div className='flex ' >
              Data Modal
             </div>
            </div>
           
            <div className='flex flex-row ' >
              {/* Mapped wardrobe data. */}
            </div>
          </div>
          <div className='flex flex-row' >
            {/* mapped items, research. */}
            <div className='flex flex-col' >
            <Image className='' src="/" quality={100} width={100} height={100} alt="Image 01" />
            <div className='' >
              <h1>Evolving the classics. </h1>
              <h3>Icons only.</h3>
              <Link href=" " className='' >Read more</Link>
            </div>
            </div>
            <div className='flex flex-col' >
            <Image className='' src="/" quality={100} width={100} height={100} alt="Image 01" />
            <div className='' >
              <h1>Evolving the classics. </h1>
              <h3>Icons only.</h3>
              <Link href=" " className='' >Read more</Link>
            </div>
            </div>
            <div className='flex flex-col' >
            <Image className='' src="" quality={100} width={100} height={100} alt="Image 01" />
            <div className='' >
              <h1>Evolving the classics. </h1>
              <h3>Icons only.</h3>
              <Link href=" " className='' >Read more</Link>
            </div>
            </div>
          </div>
          
        </div>
        
        {/* <div className='flex flex-col md:w-1/3 md:h-1/2 max-md:text-black md:self-center max-sm:row-start-2 max-sm:px-4' >
          <Image className='max-sm:w-full md:h-5/6 md:w-5/6 ' height={100} width={100} quality={100} src="https://files.stripe.com/links/MDB8YWNjdF8xUFMyMUFFTFdrSWllQWF4fGZsX3Rlc3RfZEc5aDNKZ014QkdnSVJ2OTVqNHlNTlVz00Sn9naSdL" alt='' />
          <h2 className='font-medium text-3xl ' >Made In America</h2>
          <h3 className='font-light text-xl ' >Clothed In Freedom</h3>
          
          <Link className='font-extralight text-md ' href='/american' >Read More</Link>
        </div>
        <div className='flex flex-col md:w-1/3 md:h-1/2 md:self-center max-sm:text-black max-sm:row-start-2 max-sm:px-4 ' >
          <Image height={100} width={100} quality={100} className='max-sm:w-full md:h-5/6 md:w-5/6 ' src="https://files.stripe.com/links/MDB8YWNjdF8xUFMyMUFFTFdrSWllQWF4fGZsX3Rlc3RfVUY1bFNjNUxsWk5lSnk5b2dCUk5vUDRp001EUVh7wV" alt='' />
          <h2 className='font-medium text-3xl ' >Casual Luxury</h2>
          <h3 className='font-light text-xl ' >It's Friday every day.</h3>
           
          <Link className='font-extralight text-md ' href='/casuals' >Read More</Link>
        </div> */}
      </div>
     
      {/* <div className='max-md:text-black max-md:flex-col md:row-start-3 md:col-start-1 md:col-span-3 border-2 ' >
          
           <Kings/>
           <Favorites/>
      </div> */}
      
       
        {/*  <div className='flex md:row-start-4 md:col-start-1 md:col-span-3 ' >
         
       
         
        </div> */}
         
      <div className='flex w-full row-start-4 col-start-1 col-span-3' >
         <Footer/>
      </div>
      </div>
  )
}

export default Home