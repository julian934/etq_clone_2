"use client"
import React,{useState,useEffect,useRef} from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '@/app/components/ui/checkoutForm/page';
import { useQuery } from '@tanstack/react-query';
import { getPaymentIntent } from '@/app/lib/actions/getData';
import {getTestData} from '../../lib/actions/getData'
type Props = {}
const stripePromise=loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_API_KEY}`);

const TestCheckout = (props: Props) => {
    const {data}=useQuery({
        queryKey:['testData'],
        queryFn:getTestData,
        staleTime:3000
    })
    const [testing,setTesting]=useState<any>()
    useEffect(()=>{
        /*async function getTestData(){
            
       
            let testData=await fetch('/api/data')
              console.log(testData)
              const finData=await testData.json()
              setTesting(finData)
              return testing
          }*/
          getTestData()
    },[])
    const [clientSecret,setClientSecret]=useState('');
   /* if(data){
        let newData=data
        setClientSecret(newData)
        console.log(data)
        console.log(clientSecret)
    }
    const options={
        clientSecret
    };
   */
  console.log(data)
  if(data){
    console.log(data)
  }
  return (<div>
    <h1>Test</h1>
    <button onClick={getTestData} ></button>
    {/*<Elements stripe={stripePromise} options={options}>
    <CheckoutForm />
  </Elements> */}
  </div>
   
  )
}

export default TestCheckout