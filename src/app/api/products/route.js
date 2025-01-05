import { NextResponse } from "next/server";
import Stripe from "stripe";
export async function GET(){
  const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)
  let products=await stripe?.products?.list({
    limit:100
  })
  console.log(products.data)
  return NextResponse.json(products.data)
}