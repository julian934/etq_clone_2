import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(request: NextRequest) {
    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET!);
  
    try {
      const testData = await stripe.products.list();
      console.log('Test Data:', testData);
  
      return NextResponse.json({ data: testData }); // No need to stringify
    } catch (error) {
      console.error("Stripe API error:", error);
      return NextResponse.json(
        { message: "Could not retrieve data", error: 'no data' },
        { status: 500 }
      );
    }
  }
  