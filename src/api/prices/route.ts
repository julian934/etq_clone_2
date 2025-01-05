import Stripe from "stripe";

import { NextResponse } from "next/server";
export async function getPrices(){
  const stripe=await new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
  try {
    let data=await stripe.prices.list()
    return NextResponse.json({data:data})
  } catch (error) {
    return NextResponse.json({message:"No database found, server error imminent!"},{status:500})
  }

}

export {getPrices as GET}