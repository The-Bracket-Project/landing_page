import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request) {
  try {
    // Check if the API URL is configured
    if (!API_BASE_URL) {
      throw new Error('NEXT_PUBLIC_API_URL environment variable is not configured');
    }

    // Get the request body
    const body = await request.json();
    
    // Validate the required fields from AssessmentState
    if (!body.interests || !Array.isArray(body.interests)) {
      return NextResponse.json(
        { error: 'Invalid interests data' },
        { status: 400 }
      );
    }

    if (!body.selfDescription || typeof body.selfDescription !== 'string') {
      return NextResponse.json(
        { error: 'Invalid selfDescription data' },
        { status: 400 }
      );
    }

    if (!body.availableGroups || !Array.isArray(body.availableGroups)) {
      return NextResponse.json(
        { error: 'Invalid availableGroups data' },
        { status: 400 }
      );
    }

    if (!body.groupSelection || !Array.isArray(body.groupSelection)) {
      return NextResponse.json(
        { error: 'Invalid groupSelection data' },
        { status: 400 }
      );
    }

    if (!body.followUpQuestions || !Array.isArray(body.followUpQuestions)) {
      return NextResponse.json(
        { error: 'Invalid followUpQuestions data' },
        { status: 400 }
      );
    }

    if (!body.personalityResponses || !Array.isArray(body.personalityResponses)) {
      return NextResponse.json(
        { error: 'Invalid personalityResponses data' },
        { status: 400 }
      );
    }
    
    // Construct the full API URL
    const fullApiUrl = `${API_BASE_URL}/api/generate-summary`;
    
    // Forward the request to the external API
    const response = await fetch(fullApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        interests: body.interests,
        selfDescription: body.selfDescription,
        availableGroups: body.availableGroups,
        groupSelection: body.groupSelection,
        followUpQuestions: body.followUpQuestions,
        personalityResponses: body.personalityResponses
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    // Get the response data
    const data = await response.json();
    
    // Return the response data with proper CORS headers
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error) {
    console.error('Error proxying request to generate-summary API:', error);
    console.error('API URL used:', `${API_BASE_URL}/api/generate-summary`);
    
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  }
}

// Handle preflight OPTIONS request
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}