import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24-preview' as any,
    })
  : null;

export async function POST(req: Request) {
  try {
    const { priceId } = await req.json();

    // Handle simulation IDs for the demo/hosting without real Stripe setup
    if (priceId.includes('simulation') || !stripe) {
      return NextResponse.json({ 
        url: `${req.headers.get('origin')}/dashboard?success=true`,
        simulated: true 
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.get('origin')}/dashboard?success=true`,
      cancel_url: `${req.headers.get('origin')}/pricing?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Stripe Checkout Error:', error);
    
    // Fallback for hosting demo if Stripe fails (e.g. invalid keys)
    return NextResponse.json({ 
      url: `${req.headers.get('origin')}/dashboard?success=true`,
      error: error.message 
    });
  }
}

export const dynamic = 'force-dynamic';
