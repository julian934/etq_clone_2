import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
export async function GET(request:NextRequest){
    const stripe=await new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET}`);
    console.log( 'Testing Data: ', process.env.NEXT_PUBLIC_STRIPE_SECRET)
    try {
        if(stripe){
            const iconData=await stripe.products.search({
                query:`name:'Bates 8 Inch GX-8 CompToe Desert Boot'`
            })
            console.log('returned data: ', iconData);
            return NextResponse.json({data:iconData.data})
        }
        return NextResponse.json({message:'Data not found!'});
    } catch (error) {
        return NextResponse.json({error:'Data not found!'},{status:500})
    }

}