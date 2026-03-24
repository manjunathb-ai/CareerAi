import { NextResponse } from 'next/server';

/**
 * Affiliate Tracking API:
 * Simple logging endpoint to track click-through rates (CTR).
 * In a real production app, this would push data to Mixpanel, PostHog, or a DB.
 */
export async function POST(req: Request) {
  try {
    const { affiliateId, link } = await req.json();
    
    // Log for analytics (simulated)
    console.log(`[AFFILIATE_CLICK] ID: ${affiliateId} | URL: ${link} | TS: ${new Date().toISOString()}`);
    
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
