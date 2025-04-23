import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import Stripe from "stripe";
export async function GET(request:NextRequest){
    const stripe= new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET}`)
    console.log( 'Testing Data: ', process.env.NEXT_PUBLIC_STRIPE_SECRET)
try {
    if(stripe){
        //const homeSale=await stripe.products.list();
        const testData=await stripe.products.list({
            limit:100
        });
        console.log('test Data: ', JSON.stringify(testData))
        //console.log('Retrieved Data:',JSON.stringify(testData));
          
        return NextResponse.json({data:testData})
    }
    return NextResponse.json({message:'Data not found!'})
} catch (error) {
    return NextResponse.json({message:'Could not connect...', error:error},{status:500})
}
}

