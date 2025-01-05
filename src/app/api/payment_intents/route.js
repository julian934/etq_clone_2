import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY,{apiVersion:'2022-11-15'});

export async function POST(request) {
  try {
    const { amount } = await request.json(); // Amount should be passed in the request body
    const paymentIntent = await stripe.paymentIntents.create({
      amount:2000,
      currency: 'usd',
      automatic_payment_methods:{
        enabled:true
      },
      confirm:true
    });
   console.log('payment secret: ',paymentIntent.client_secret)
    return new Response({ clientSecret: paymentIntent.client_secret},{status:200});
  } catch (error) {
    return new Response(`Server Error: ${error.message}`, { status: 500 });
  }
  const { amount } = await request.json(); // Amount should be passed in the request body
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
   console.log('payment secret: ',paymentIntent.client_secret)
    return new Response({ clientSecret: paymentIntent.client_secret},{status:200});
} 

