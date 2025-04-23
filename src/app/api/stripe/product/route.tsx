import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import Stripe from "stripe";

export async function getProducts(request:NextRequest){
    const req=await request.nextUrl.searchParams;
    const id=req.get('id');//get item id from frontend

    console.log("Current ID: ", id)
    const stripe= await new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET}`);

    try {
        if(stripe){
            const product=await stripe.products.retrieve(`${id}`);
            console.log("Current Product: ", product)
             return NextResponse.json({data:product});
        }
        return NextResponse.json({data:''})
    } catch (error) {
        return NextResponse.json({message:error},{status:500})
    }
}