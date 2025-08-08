import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
console.log("API_BASE_URL in Vercel:", process.env.NEXT_PUBLIC_API_URL);

export async function POST(request) {
  try {
    // Check if the API URL is configured
    if (!API_BASE_URL) {
      throw new Error('NEXT_PUBLIC_API_URL environment variable is not configured');
    }



    // Get the request body
    const body = await request.json();
    
    // Construct the full API URL
    const fullApiUrl = `${API_BASE_URL}/api/groups`;
    
    // Forward the request to the API
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
    
    // Return the raw data with proper CORS headers
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
    
  } catch (error) {
    console.error('Error proxying request to API:', error);
    console.error('API URL used:', `${API_BASE_URL}/api/groups`);
    
    return NextResponse.json(
      { error: 'Failed to process request' },
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