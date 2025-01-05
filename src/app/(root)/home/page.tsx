"use client"
import React,{useState,useEffect} from 'react'
import NavBar from '@/app/components/ui/nav/navbar'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/app/components/ui/footer/footer'
//import { getPaymentIntent } from '@/app/lib/actions/getData'
import { useQuery } from '@tanstack/react-query'
import { useSession,signIn,signOut } from 'next-auth/react'
import { getProducts } from '@/app/lib/actions/getData'
import banner from '../../localImages/banners/Classic.jpg'
import Favorites from '@/app/components/ui/favorites/favorites'
import { getTestData } from '@/app/lib/actions/getData'
import { testUsers } from '@/app/lib/actions/getData'
import Kings from '@/app/components/shared/kingscollection/kingscollection'
type Props = {} 

const Home = (props: Props) => {
  const [clientSecret,setClientSecret]=useState('');
  const {data,isError}=useQuery({
    queryKey:['products'],
    queryFn:testUsers
})
const {data:session}=useSession();
if(session){
  console.log(session)
}
console.log(data)
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
        
     
       <div className=' flex z-50 md:row-start-1 md:col-start-1 md:col-span-3 max-md:w-full md:w-full h-12 z-40 flex-row bg-black ' >
              <NavBar/>
           </div>
        
      
      <div className='flex max-md:w-full max-md:h-screen md:h-full md:row-start-1 md:col-start-1 md:col-span-3 md:h-80vh md:w-full md:bg-black max-md:flex-col max-md:flex-wrap max-md:grid max-md:grid-cols-4 max-md:grid-rows-4  bg-black ' >
          <div className='flex max-md:h-full max-md:w-full max-md:h-screen max-md:col-start-1 max-md:col-span-4 md:w-2/3 md:bg-black ' >
            {/* Banner Image, alternating URLs, swap state after time intervals. Include transition.*/}
            {/* black and white overlay for image */}
            <Image className=' flex max-md:h-5/6 w-full max-md:w-full  md:h-5/6 md:w-full' quality={100} src={banner} alt='Magisters Corner Banner Image' />
          </div>
          <div className='flex flex-col md:w-1/4 md:h-2/3 md:space-y-4 md:px-8  justify-center max-sm:row-start-3  max-md:bottom-12 max-md:self-end md:bg-black max-sm:justify-center max-md:w-full max-md:h-20 max-sm:w-72 max-md:space-y-2  max-sm:self max-sm:px-4 z-20 ' >
            <h3 className='  max-md:text-xl text-white max-md:w-full font-medium  md:text-2xl  ' >Fit for Royalty</h3>
            <h1 className='max-md:text-3xl text-white max-md:w-full font-semibold  md:text-4xl ' >The new classics</h1>
            <h3 className=' max-md:text-md text-white max-md:w-full max-md:w-full font-light md:text-lg  ' >Elevate your look.</h3>
            <Link className='max-md:text-sm text-white max-md:w-full  font-extralight  md:text-md ' href='/' >Shop All</Link>
          </div>
      </div>
      <div className='flex max-sm:flex-col md:col-start-1 md:col-span-3 md:row-start-2 md:h-full max-h-30vh max-sm:grid max-sm:grid-cols-2 max-sm:grid-rows-2 md:bg-white md:flex-row max-sm:w-full max-sm:space-y-4 md:border-2 '>
        {/* Set to row on medium sizes and up, add pagination for selectors.*/}
        {/* mapped over product images for definitions. */}
        <div className=' flex max-sm:justify-center flex-col md:w-1/3 md:h-1/2 md:self-center max-md:text-black pl-4 max-sm:col-start-1 max-sm:col-span-2 max-sm:row-start-1 max-sm:px-4' >
          {/* may need new image */}
          <Image className='max-sm:h-full max-sm:w-full md:h-5/6 md:w-5/6' height={100} width={100} quality={100} src="https://files.stripe.com/links/MDB8YWNjdF8xUFMyMUFFTFdrSWllQWF4fGZsX3Rlc3RfY2VSRmdBWUVyU0hPVXB2TFFnUU5JWDBx00CtQnpezn" alt='' />
          <div className='flex flex-col max-sm:h-full' >
          <h2 className=' font-medium text-3xl ' >Classic Styles</h2>
          <h3 className=' font-light text-xl ' >You can't beat the classics.</h3>
           {/* Add underline for link*/}
          <Link className='font-extralight text-md ' href='/classics' >Read More</Link>
          </div>
        </div>
        <div className='flex flex-col md:w-1/3 md:h-1/2 max-md:text-black md:self-center max-sm:row-start-2 max-sm:px-4' >
          <Image className='max-sm:w-full md:h-5/6 md:w-5/6 ' height={100} width={100} quality={100} src="https://files.stripe.com/links/MDB8YWNjdF8xUFMyMUFFTFdrSWllQWF4fGZsX3Rlc3RfZEc5aDNKZ014QkdnSVJ2OTVqNHlNTlVz00Sn9naSdL" alt='' />
          <h2 className='font-medium text-3xl ' >Made In America</h2>
          <h3 className='font-light text-xl ' >Clothed In Freedom</h3>
          {/* Add underline for link*/}
          <Link className='font-extralight text-md ' href='/american' >Read More</Link>
        </div>
        <div className='flex flex-col md:w-1/3 md:h-1/2 md:self-center max-sm:text-black max-sm:row-start-2 max-sm:px-4 ' >
          <Image height={100} width={100} quality={100} className='max-sm:w-full md:h-5/6 md:w-5/6 ' src="https://files.stripe.com/links/MDB8YWNjdF8xUFMyMUFFTFdrSWllQWF4fGZsX3Rlc3RfVUY1bFNjNUxsWk5lSnk5b2dCUk5vUDRp001EUVh7wV" alt='' />
          <h2 className='font-medium text-3xl ' >Casual Luxury</h2>
          <h3 className='font-light text-xl ' >It's Friday every day.</h3>
           {/* Add underline for link*/}
          <Link className='font-extralight text-md ' href='/casuals' >Read More</Link>
        </div>
      </div>
      <div className='max-md:text-black max-md:flex-col md:row-start-3 md:col-start-1 md:col-span-3 border-2 ' >
           {/* Mapped based on the conditions of most popular three items. Includes images, names, if there's a promotion and sale price.*/}
           <Kings/>
           <Favorites/>
      </div>
      
        <div className='flex md:row-start-4 md:col-start-1 md:col-span-3 ' >
          {/* King's Raiment-Collection of the most popular styles */}
       
         
        </div>
         
      <div className='flex w-full md:col-start-1 md:col-span-3' >
         <Footer/>
      </div>
      </div>
  )
}

export default Home