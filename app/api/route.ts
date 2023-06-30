import { NextResponse } from 'next/server';

type StripeResponse = {
  sessions: string;
};

export function GET() {
  return NextResponse.json({
    sessions: '/api/sessions',
  });
}
