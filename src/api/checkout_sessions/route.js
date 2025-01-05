import { NextResponse } from "next/server";

export default async function POST(request) {
  const stripe=process.env.NEXT_PUBLIC_STRIPE_CLIENT_SECRET_KEY
    if (request.method === 'POST') {
      try {
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
              price: 1,
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `${request.headers.origin}/?success=true`,
          cancel_url: `${request.headers.origin}/?canceled=true`,
        });
        return NextResponse.redirect(session.url,303);
      } catch (err) {
        
        NextResponse.error(err.statusCode || 500).json(err.message)
      }
    } else {
      NextResponse.error('Method Not Allowed');
    }
  }