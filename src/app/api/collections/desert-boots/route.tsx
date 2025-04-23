import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function getDesertBoots(request:NextRequest){
    const stripe=await new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET}`)
    try {
        //const req=await request.json()
        
        if(stripe){
            console.log("Connection status: ", stripe)
            const boots=await stripe.products.search({
                query:'metadata["category"]:"desert-boots"'
            });
            //const boots= await products?.data.filter((vals:any)=>vals.category.includes('desert-boots'));
            console.log("Returned data: ", boots)
            return NextResponse.json({data:boots})

        }


        return NextResponse.json({data:'Data found!'})
        
    } catch (error) {
        return NextResponse.json({message:'Data Not Found.'}, {status:500})
    }

}

export {getDesertBoots as GET}