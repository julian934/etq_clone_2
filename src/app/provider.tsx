'use client'

import React, {useState,useEffect} from 'react';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {StoreStateContextProvider} from './lib/context/storeContext'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import { getPaymentIntent } from './lib/actions/getData';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
const Provider=({children}:any)=>{
    const [client]=useState(new QueryClient());
    const [clientSecret,setClientSecret]=useState(''); 
   
    /*useEffect(()=>{
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: 5000 }), // Example amount in cents
          })
            .then((response) => {
                return response.json()
            } )
            .then((data) => setClientSecret(data.clientSecret));
            console.log(clientSecret)
    },[]);
    */
    const options={
        clientSecret
    };
     // Debugging: Check environment variables
     console.log('Stripe Publishable Key:', process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_API_KEY);
     console.log('Stripe Client Secret Key:', process.env.STRIPE_SECRET_KEY);
    console.log('Stripe Secret: ',clientSecret)
    return(
        <>
        <StoreStateContextProvider>
            <QueryClientProvider client={client} >
                <ReactQueryStreamedHydration>
                    {/*clientSecret && (
                      
                    )*/}
                    <SessionProvider   >
                       {children}
                       </SessionProvider>
                </ReactQueryStreamedHydration>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </StoreStateContextProvider>
        </>
    )
}

export {Provider}