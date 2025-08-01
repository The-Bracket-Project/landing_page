import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { interests } = await request.json();

    // Validate the interests data
    if (!interests || !Array.isArray(interests)) {
      return NextResponse.json(
        { error: 'Invalid interests data' },
        { status: 400 }
      );
    }

    if (interests.length < 3) {
      return NextResponse.json(
        { error: 'At least 3 interests are required' },
        { status: 400 }
      );
    }

    // Process the interests data
    // TODO: Save to database when backend is ready
    // TODO: Generate available groups based on interests when algorithm is implemented

    return NextResponse.json({
      success: true,
      message: 'Interests saved successfully',
      data: {
        interests,
        processedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error processing interests:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 