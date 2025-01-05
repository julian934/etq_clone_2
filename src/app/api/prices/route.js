import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(){
    const stripe=new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
  let data=await stripe?.prices?.list()
  console.log(data)
  return NextResponse.json(data.data)
}