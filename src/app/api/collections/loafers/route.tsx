import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function GET(request:NextRequest){
    const stripe=await new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET}`)
    try {
        //const req=await request.json()
        
        if(stripe){
            console.log("Connection status: ", stripe)
            const loafers=await stripe.products.search({
                query:'metadata["category"]:"loafers"'
            });
            
            
            return NextResponse.json({data:loafers})

        }


        return NextResponse.json({data:'Data found!'})
        
    } catch (error) {
        return NextResponse.json({message:'Data Not Found.'}, {status:500})
    }

}

