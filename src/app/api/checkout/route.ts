import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const { cart } = await request.json();
    console.log("Cart items:", JSON.stringify(cart, null, 2));  // Add this before processing

    // Check if cart is valid and is an array
    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ error: "Cart is empty or not an array" }, { status: 400 });
    }
    const safeStringify = (obj: any) => {
        const cache: any[] = [];
        return JSON.stringify(obj, (key, value) => {
          if (typeof value === "object" && value !== null) {
            if (cache.includes(value)) {
              return; // Circular reference found, return undefined to remove it
            }
            cache.push(value);
          }
          return value;
        });
      };
      
    // Validate if the cart items contain valid price IDs and quantities
    const revisedCart = cart.map((val: any) => {
      if (!val.price || !val.quantity || val.quantity <= 0) {
        throw new Error(`Invalid price or quantity: ${safeStringify(val)}`);
      }
      const quantity = val.quantity && val.quantity > 0 ? val.quantity : 1;
      return {
        price: val.price, // This should be a valid Stripe price ID, e.g., "price_1QnSBLELWkIieAaxxoZSxTQy"
        quantity: quantity, // Default to 1 if no quantity is provided
      };
    });

    // Log the revisedCart structure for debugging
    console.log("Revised Cart (before passing to Stripe):", safeStringify(revisedCart));

    // Ensure the origin is set correctly
    const headersList = headers();
    const origin = headersList.get("origin") || "http://localhost:3000";

    // Initialize Stripe with the secret key from environment variables
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2024-04-10",
    });

    // Create the Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items:[
        {
           
            "price": "price_1QnSBLELWkIieAaxxoZSxTQy",
            "quantity": 3
          }
      ],
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    });

    // If session URL is generated, return it
    if (session.url) {
        console.log("Stripe session created:", session);
      return NextResponse.json({ url: session.url });
    } else {
        console.error("No session URL returned from Stripe");
      return NextResponse.json({ error: "No session URL returned from Stripe" }, { status: 500 });
    }
  } catch (error) {
    console.error("Stripe checkout error:", error);
   // console.error("Stripe checkout error:", error instanceof Error ? error.message : error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

