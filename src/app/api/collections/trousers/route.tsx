import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function getTrousers(request:NextRequest){
    const stripe=await new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET}`)
    try {
        //const req=await request.json()
        
        if(stripe){
            console.log("Connection status: ", stripe)
            const trousers=await stripe.products.search({
                query:'metadata["category"]:"trousers"'
            });
            
            
            return NextResponse.json({data:trousers})

        }


        return NextResponse.json({data:'Data found!'})
        
    } catch (error) {
        return NextResponse.json({message:'Data Not Found.'}, {status:500})
    }




}

export {getTrousers as GET}