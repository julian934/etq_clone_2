import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import Stripe from "stripe"

export async function getProducts(request:NextRequest){
    const stripe=await new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
 try {
    if(stripe){
        const currProducts=stripe.products.list();  

        return NextResponse.json({data:currProducts});
    }
    return NextResponse.json({message:"We could not connect to the database!"},{status:304});
 } catch (error) {
    return NextResponse.json({message:"Database not found, server error imminent!"},{status:500});
 }   

}
export {getProducts as GET}