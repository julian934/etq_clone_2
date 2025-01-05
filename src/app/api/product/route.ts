import Stripe from "stripe";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export async function GET(request:NextRequest){
    const stripe:any=new Stripe(`${process.env.STRIPE_SECRET_KEY}`);
    const searchParams=request.nextUrl.searchParams;
    const productId=searchParams.get('productID')
    console.log(productId)
    if(!productId){
        return NextResponse.json({error:'No request entered.'})
    }
   
    //console.log(stripe);
    const prod=await stripe?.products?.retrieve(productId);
    console.log(prod);
    return NextResponse.json({data:prod})
}

