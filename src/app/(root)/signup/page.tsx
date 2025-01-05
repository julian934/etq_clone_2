'use client'
import React, { Ref, SetStateAction } from 'react';
import axios from 'axios';
import { useState,useEffect,useRef,useContext } from 'react';
import { StoreStateContext } from '@/app/lib/context/storeContext';
import Input from 'next'
import type { DetailedHTMLProps } from 'react';
import type { InputHTMLAttributes } from 'react';
import type { LegacyRef } from 'react';
import type { MutableRefObject } from 'react';
import { FormEvent } from 'react';
import Link from 'next/link';
type Props = {}

const SignUp = (props: Props) => {
    const [userName,setUserName]=useState<SetStateAction<string> | React.MutableRefObject<undefined | string  > >('');
    const [userPass,setUserPass]=useState<SetStateAction<string> | React.MutableRefObject<undefined | string  > >('');
    const [submit,setSubmit]=useState(false)
    const [userImage,setUserImage]=useState<File | null>(null);
    const userRef=useRef< HTMLInputElement>(null);
    const passRef=useRef<HTMLInputElement>(null);
    const handlerUserChange=()=>{
        if (userRef.current) {
            setUserName(userRef.current.value);
        }
    }
    const handlePassChange=()=>{
        if (passRef.current) {
            setUserPass(passRef.current.value);
        }
    }
    const handleImage=(event: React.ChangeEvent<HTMLInputElement>)=>{
        if (event.target.files && event.target.files[0]) {
            setUserImage(event.target.files[0]);
        }
        
    }
    console.log(userRef);
    console.log(passRef);
    const submitData=(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const formData=new FormData()
        //const user=formData?.username
        const dataSet={
            username:userName,
            password:userPass,
            userCart:[],
            wishList:[],
            userSettings:[]
        }
        const newUserData=axios.post('/api/signup/',{data:dataSet})
        if(userName && userPass){
            setSubmit(true)
            return newUserData
        }
        return 'Invalid New User'

    }
   console.log(userRef.current?.value)
   console.log(passRef.current?.value)
   console.log(userName)
   console.log(userPass)
    //expected type: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  return (
    <div className='' >
       
         {!submit && (<>
            <h1 className='' >Create New User</h1>
            <div className=''>
            <form onSubmit={submitData} >
            <input className='' placeholder='Username' ref={userRef} onChange={handlerUserChange} name='username' />
            <input className='' placeholder='Password'  ref={passRef} onChange={handlePassChange}  name='password' />
            
            {/* <input className='' placeholder='Profile Picture' type='file' accept='image/*' />*/}
            <button className=' ' type='submit' >Sign Up!</button>
            </form>
         
         </div>
         </>)}
         {submit && (<>
         <h1 className='' >New Account Created!</h1>
         <Link className='' href='/home' >Back to Home</Link>
         </>)}
       
        {/*  <input className='' placeholder='Profile Picture' onChange={()=>handleImage} type='file' accept='file'/> */}
       
    </div>
  )
}

export default SignUp