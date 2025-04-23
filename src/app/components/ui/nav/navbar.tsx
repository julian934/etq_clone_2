'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
type Props = {}

const NavBar = (props: Props) => {
  const [toggled,setToggled]=useState(false)
  const [toggleFootWear,setToggleFootWear]=useState<boolean>(false);
  const [toggleMenswear,setToggleMensWear]=useState<boolean>(false);
  const [toggleSale,setToggleSale]=useState<boolean>(false);

    //Sticky Nav even on mobile.
    //replace with shadcn ui components
    //figure out how to take elements completely out of the order of rendered elements based on mobile or desktop
    //connect navbar to UI
    //Route the navigation to whether or not the hover state is true over the selected item, and render a default state if not. 
    if(!toggled){
      return(<nav className='flex z-50 justify-between border-2 border-white max-sm:invisible max-sm:w-full flex-row md:w-full max-sm:space-around text-black h-16 max-sm:items-center space-x-14 ' >
        <div className='flex bg-red-200 ' >
         <button onClick={()=>setToggled(true)} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    </div>
    <div className='flex justify-start  self-center text-white z-50 hover:bg-white '>
            {/* Get sarif fonts*/}
            <div className='' > 
               <Link href='/' className='text-whi font-medium' >The Magisters Corner</Link>
            </div>
             <div>
             <Link href='/' className='' > Footwear  </Link>
             </div>
             <div>
             <Link href='/' className='' > Menswear </Link>
             </div>
              <div> 
              <Link href='/' >Sale</Link>
              </div>
            
        </div>
        <div className=' flex flex-row justify-end justify-around  self-center  max-sm:flex-col max-sm:items-center '>
              <div className='flex' >
                {/* Settings icon for mobile*/}
                <Link href='/settings' className='text-white' >settings icon</Link>
              </div>
              <div className='flex max-sm:invisible  ' >
                   <button className='text-white'  >search</button>
                   <Link href='/settings' className='text-white' >settings</Link>
              </div>
        </div>
      </nav>)
    }
  return (
    <nav className='flex bg-red-200 max-sm:w-full flex-row md:w-full space-around bg-black  max-sm:items-center z-50 text-black ' >
        {/* mobile*/}
        <div className='flex md:invisible max-sm:flex-col pt-60' >
           {/* mobile drop-down*/}
           <button onClick={()=>setToggled(false)}data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
           <div className=" w-full md:block md:w-auto text-black" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg text-black bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
        </li>
        <li>
          <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
        </li>
        <li>
          <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
        </li>
        <li>
          <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
        </li>
        <li>
          <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
        </li>
      </ul>
    </div>
            
        </div>
        <div className='flex z-50 text-black '>
            {/* Get sarif fonts*/}
             <Link href='/' className=' font-medium text-black ' >The Magisters Corner</Link>
        </div>
        <div className=' flex flex-row  max-sm:flex-col max-sm:items-center text-black '>
              <div className='flex' >
                {/* Settings icon for mobile*/}
                <Link href='/settings' className='' >settings icon</Link>
              </div>
              <div className='flex max-sm:invisible  ' >
                   <button className='text-black'  >search</button>
                   <Link href='/settings' className='' >settings</Link>
              </div>
        </div>
        {toggleFootWear && <div className='' >
          </div>}
        {toggleMenswear && <div className=' text-black ' >
          <div className='' >
           <Link className='' href="/menswear" >
           <Image  className='' src='' alt='Menswear Default Pic ' />
           <h1 className='' >All Menswear</h1>
           <h2 className='' >365 Days a Year.</h2>
           </Link>
          </div>
           <div className='' >
           <Link className='' href="/trousers" >
           <Image  className='' src='' alt='Trousers default pic ' />
           <h1 className='' >Trousers</h1>
           <h2 className='' >Walk it with confidence.</h2>
           </Link>
          </div>
          <div className='' >
          <Link className='' href="/sneakers" >
           <Image  className='' src='' alt='Sneakers Default Pic ' />
           <h1 className='' >Sneakers</h1>
           <h2 className='' >Everyday luxury.</h2>
           </Link>
          </div>
          <div className='' >
          <Link className='' href="/tshirts" >
           <Image  className='' src='' alt='T-Shirt Default Pic ' />
           <h1 className='' >T-Shirts</h1>
           <h2 className='' >Built for the long haul.</h2>
           </Link> 
          </div>
          </div>}
          {toggleSale && <div className='' >
            
            </div>}
    </nav>

  )
}

export default NavBar