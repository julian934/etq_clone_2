import Stripe from "stripe";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function PriceData(request:NextRequest){
    
    const stripe:any=await new Stripe(`${process.env.STRIPE_SECRET_KEY}`);
    const searchParams=await request.nextUrl.searchParams;
    const productId=await searchParams.get('id')
    console.log("frontend Data: ", productId)
    try {
        
       
        //console.log(stripe);
        if(productId){
           
            const prod=await stripe.prices.retrieve(productId);
            console.log("Found Product: ", prod);
    
            return NextResponse.json({data: prod})
        }else{
            return NextResponse.json({error:'No request entered.'})
        }
        
    } catch (error) {
        return NextResponse.json({error:error},{status:500})
    }
   
}

export {PriceData as GET}