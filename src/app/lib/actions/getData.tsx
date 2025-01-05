//'use client'
//import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import axios, { AxiosResponse } from 'axios';
import { useState,useEffect } from 'react';
import { useContext } from 'react';
import { StoreStateContext } from '../context/storeContext';

export async function getPaymentIntent(){
  const {data}=await axios.post('/api/payment_intents',{
    //priceId:item.id,
    body:JSON.stringify('testData')
},
{
    headers:{
        "Content-Type":"application/json",
    }
}
);
window.location.assign(data)
 /* let secret:string=process?.env?.STRIPE_SECRET_KEY
  const stripe = new Stripe(secret,{apiVersion:'2022-11-15'});
  try {
    //const { amount } = await request.json(); // Amount should be passed in the request body
    const paymentIntent = await stripe.paymentIntents.create({
      amount:2000,
      currency: 'usd',
      automatic_payment_methods:{
        enabled:true
      },
      confirm:true
    });
   console.log('payment secret: ',paymentIntent.client_secret)
   let data={ clientSecret: paymentIntent.client_secret,status:200}
    return {data};
  } catch (error) {
    let errMessage=`Server Error: ${error}`
    return errMessage
  }
    */
}

export async function getTestData(){

  //const ctx=useContext(StoreStateContext)
  /*try{
    let testData=fetch('/api/testEndPoint')
    console.log(testData)
    return testData
  }catch(error){
    console.log(error)
  }
    */
  let testData=await axios.get('/api/prices').then((vals)=>{
    return vals
  })
  
    console.log(testData)
   // const finData=await testData.json()
   //ctx.dataCheck(finData)
   //console.log(ctx.testData)
    return testData
}

export async function getProducts(){
  let products=await axios.get('/api/products').then((vals)=>{
    return vals
  })
  console.log(products)
  return products
}

export async function kings(){
  let prods=await axios.get('/api/products').then((vals)=>{
    return vals
  })
  //implemenet pagination
  console.log(prods)
  return prods
}

export async function favorites(){

  let prods=await axios.get('/api/favorites').then((vals)=>{
    return vals
  })
  //Check for most purchased items and sort list. Limit to top 10.
  //perform operations from context.
  console.log(prods)
  return prods
}

interface Item{
  id:number,
  name:string
}
export async function getUsers(){
  let users=await fetch('/api/mongodb').catch((error)=>{
    console.log(error)
  })
  console.log(users)
  return users
}

export async function testUsers(){
  let tests=await fetch('/api/mongodb');
  let vals=await tests.json();
  let tested=await tests

  return vals
}
export async function productDetails(product:string){
    let users=await axios.get(`/api/product?productID=${product}`).then((vals)=>{
      return vals
    })
    //Post to backend and only use GET for stripe connection on backend.    
    return users
}