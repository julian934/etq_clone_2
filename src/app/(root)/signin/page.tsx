'use client'
import React from 'react'
import {useState,useEffect,useRef,useContext} from 'react'
import { StoreStateContext } from '@/app/lib/context/storeContext'
import { useSession,signIn,signOut } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '@/app/lib/actions/getData'
import Link from 'next/link'
import { SetStateAction } from 'react'
type Props = {}

const Test = (props: Props) => {
    const {data:session}=useSession();
    const [userName,setUserName]=useState<SetStateAction<string> | React.MutableRefObject<undefined | string  > >('');
    const [userPass,setUserPass]=useState<SetStateAction<string> | React.MutableRefObject<undefined | string  > >('');
    const userRef=useRef<HTMLInputElement>(null);
    const passRef=useRef<HTMLInputElement>(null);
    const {data}=useQuery({
        queryKey:['testData'],
        queryFn:getUsers
    })
    const handleUser=()=>{
        if(userRef.current){
            setUserName(userRef?.current?.value)
        }
       
    }
    const handlePass=()=>{
        if(passRef.current){
           setUserPass(passRef?.current?.value)
        }
    }
    const getUserData=()=>{
        
    }
    console.log(session)
    console.log(data)
    if(session){
        return(<div>
            Signed in as {session?.user?.name}
            <button onClick={()=>signOut()} >Sign Out</button>
        </div>)
    }
  return (
    <div className='' >
        
        <input className='' ref={userRef} onChange={handleUser} />
        <input className=''  ref={passRef} onChange={handlePass} />
        <button className='' onClick={()=>signIn('credentials',{name:userName,password:userPass,callbackUrl:'/'})} >Sign in</button>
        <Link className='' href='/signup' >Don't have an account?</Link>
    </div>
  )
}

export default Test