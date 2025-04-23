'use client'
import React,{useState,useEffect,useRef} from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import axios from 'axios'
import * as motion from 'motion/react-client'

type Props = {}

const SignUp = (props: Props) => {
    const userRef=useRef<any>();
    const passRef=useRef<any>();
    const [sent,setSent]=useState<any>(null);

  const submitData=()=>{
        const newUser=axios.post(`/api/auth/signup?username=${userRef.current.value}&password=${passRef.current.value}`);
        setSent(!sent)
        return newUser
  }

  console.log(userRef);
  console.log(passRef);
  if(sent) console.log('user created!')
  return (
    <div className='bg-white text-black' >
      SignUp
      <form  onSubmit={submitData} >
        <input className='border-2 border-red-500' ref={userRef} placeholder='username' />
        <input className=' border-2 border-red-500' ref={passRef} placeholder='password' />
          <button className='' type='submit' >Create User</button>
      </form>
      </div>
  )
}

export default SignUp