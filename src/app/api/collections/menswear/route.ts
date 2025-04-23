import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
export async function GET(){

  try {
     const stripe=await new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET}`);
    if(stripe){
         const products=await stripe.products.search({
            query:"metadata['category']:'polo-shirt' OR metadata['category']:'polo-shirt' OR metadata['category']:'tshirt' OR metadata['category']:'trousers'"
         });
         console.log('Product query: ', products);
         return NextResponse.json({data:products});
    }

    return NextResponse.json({message: 'Could not connect to database'}, {status:304})
    
  } catch (error) {
    return NextResponse.json({error:error},{status:500})
  }
}