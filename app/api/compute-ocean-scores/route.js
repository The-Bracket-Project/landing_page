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
    
    // Validate the required assessment data
    const { 
      interests, 
      selfDescription, 
      availableGroups, 
      groupSelection, 
      followUpQuestions, 
      personalityResponses 
    } = body;

    // Validate interests
    if (!interests || !Array.isArray(interests) || interests.length < 3) {
      return NextResponse.json(
        { error: 'At least 3 interests are required' },
        { status: 400 }
      );
    }

    // Validate self description
    if (!selfDescription || typeof selfDescription !== 'string' || selfDescription.trim().length === 0) {
      return NextResponse.json(
        { error: 'Self description is required' },
        { status: 400 }
      );
    }

    // Validate available groups
    if (!availableGroups || !Array.isArray(availableGroups)) {
      return NextResponse.json(
        { error: 'Available groups data is required' },
        { status: 400 }
      );
    }

    // Validate group selection
    if (!groupSelection || !Array.isArray(groupSelection) || groupSelection.length === 0) {
      return NextResponse.json(
        { error: 'At least one group must be selected' },
        { status: 400 }
      );
    }

    // Validate follow-up questions
    if (!followUpQuestions || !Array.isArray(followUpQuestions)) {
      return NextResponse.json(
        { error: 'Follow-up questions data is required' },
        { status: 400 }
      );
    }

    // Validate personality responses
    if (!personalityResponses || !Array.isArray(personalityResponses) || personalityResponses.length === 0) {
      return NextResponse.json(
        { error: 'Personality responses are required' },
        { status: 400 }
      );
    }

    // Validate that each personality response has the required fields
    for (let i = 0; i < personalityResponses.length; i++) {
      const response = personalityResponses[i];
      if (!response.questionId || !response.answer || !response.score) {
        return NextResponse.json(
          { error: `Invalid personality response at index ${i}: missing questionId, answer, or score` },
          { status: 400 }
        );
      }
    }
    
    // Construct the full API URL
    const fullApiUrl = `${API_BASE_URL}/api/compute-ocean-scores`;
    
    // Forward the request to the AWS Lambda API
    const response = await fetch(fullApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    // Get the response data
    const data = await response.json();
    
    // Return the OCEAN scores data with proper CORS headers
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error) {
    console.error('Error computing OCEAN scores:', error);
    console.error('API URL used:', `${API_BASE_URL}/api/compute-ocean-scores`);
    
    return NextResponse.json(
      { error: 'Failed to compute OCEAN scores' },
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