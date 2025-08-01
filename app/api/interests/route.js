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

    // Here you would typically:
    // 1. Process the interests data
    // 2. Save to database
    // 3. Generate available groups based on interests
    // 4. Return processed data

    // For now, we'll simulate processing and return mock data
    const mockGroups = [
      'Creative Arts',
      'Sports & Fitness', 
      'Technology',
      'Outdoor Activities',
      'Social & Entertainment',
      'Learning & Development'
    ];

    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      message: 'Interests saved successfully',
      data: {
        interests,
        availableGroups: mockGroups,
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