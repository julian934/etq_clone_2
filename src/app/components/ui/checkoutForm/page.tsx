import React from 'react'
import {useStripe,useElements,PaymentElement } from '@stripe/react-stripe-js'
import { redirect } from 'next/navigation';
type Props = {}

const CheckoutForm = (props: Props) => {
    const stripe=useStripe();
    const elements=useElements();
    const handleSubmit=async(event:any)=>{
        event.preventDefault();
        if(!stripe || !elements){
            return;
        }
        const result=await stripe.confirmPayment({
            elements,
            confirmParams:{
                return_url:"https://localhost:3000/home",
            },
        })
        if(result.error){
            console.log(result.error.message);
        }else{
            //redirect()
        }
    }
  return (
    <form  onSubmit={handleSubmit} >
        <PaymentElement />
        <button disabled={!stripe} type='submit' >Submit</button>
    </form>
  )
}

export default CheckoutForm