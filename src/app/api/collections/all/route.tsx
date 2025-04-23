import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function GET(request:NextRequest){
    const stripe=await new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET}`)
    if(stripe){
        console.log('Connection status:', stripe)
        const products=stripe.products.list({
            limit:100
        });
        
        return NextResponse.json({data:products})
    }

    return NextResponse.json({data:'Connection Unsuccessfull'})

}

