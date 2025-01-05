import { NextRequest } from "next/server";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import Stripe from "stripe";
export async function getFavorites(){
    
        const stripe =new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
        if(stripe){
            const newData=await stripe.products.list({
                limit:100
              })
            return NextResponse.json(newData);
        }else{
            return NextResponse.json({data:'Incorrect Key!'})
        }
    
  
    return NextResponse.json({message:'Endpoint successfully connected.'})
}

export {getFavorites as GET}