'use client'
import React,{useRef,useState,useEffect} from 'react'
import { useQuery } from '@tanstack/react-query'
//import { getUsers } from '@/app/lib/actions/getData'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import { getUser } from '@/app/lib/database/connections'
import { useContext } from 'react'
import { StoreStateContext } from '@/app/lib/context/storeContext'

type Props = {}

const SignIn = (props: Props) => {
  const [userData,setUserData]=useState<any>()
  const {data:session}=useSession();
  const {data,isLoading,isSuccess,error}=useQuery({
    queryKey:['users'],
    queryFn:()=>getUser(session?.user?.name),
    enabled:!!session?.user?.name,
    staleTime:1000*60*5
  })
  const ctx=useContext(StoreStateContext);
  useEffect(() => {
    if (isSuccess && data) {
      setUserData(data)
      const currData=data
      ctx.userData(currData)
    }
  
  }, [isSuccess, data,session])
   const userRef=useRef<any>();
      const passRef=useRef<any>();
      const [sent,setSent]=useState<any>(null);
 // const [currUserData,setCurrUserData]=useState<any>()
  
  
  if(data!=undefined) console.log(data)
    if(session?.user?.name) console.log(session?.user?.name)
   // if(currUserData!=undefined) console.log(currUserData)

  console.log(data)
  console.log('testing: ', userData?.data)
   console.log('logged user: ', ctx.userState)
  return (
    <div className='bg-white text-black' >SignIn
       <input className='border-2 border-red-500' ref={userRef} placeholder='username' />
       <input className=' border-2 border-red-500' ref={passRef} placeholder='password' />
       <button onClick={()=>signIn('credentials',{username:userRef.current.value,password:passRef.current.value,callbackUrl:'/sign-in'})}  >Find User</button>
       <h1 className='' >Current User: {session?.user?.name}</h1>
       <button onClick={()=>signOut()} >Sign Out</button>
    </div>
  )
}

export default SignIn