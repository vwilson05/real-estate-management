import { NextResponse } from 'next/server';
import { geocodeAddress } from '@/lib/server/geocoding';

export async function POST(request: Request) {
  try {
    const { address } = await request.json();

    if (!address) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      );
    }

    console.log(`API route geocoding address: ${address}`);

    const result = await geocodeAddress(address);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in geocode API route:', error);
    return NextResponse.json(
      { error: 'Failed to geocode address' },
      { status: 500 }
    );
  }
} 