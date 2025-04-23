import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
export async function GET(request:NextRequest){
    const stripe=await new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET}`)
    try {
        //const req=await request.json()
        const body=await request.nextUrl.searchParams;
        const id=await body.get('id');
        console.log("current ID: ", id)
        if(stripe){
            console.log("Connection status: ", stripe)
            const boots=await stripe.products.retrieve(`${id}`)
            //const boots= await products?.data.filter((vals:any)=>vals.category.includes('desert-boots'));
            console.log("Returned data: ", boots)
            return NextResponse.json({data:boots})

        }


        return NextResponse.json({data:'Data found!'})
        
    } catch (error) {
        return NextResponse.json({message:'Data Not Found.'}, {status:500})
    }

}