import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const MAX_ATTEMPTS = 20;
const RETRY_DELAY_MS = 1000;

export async function GET(request, { params }) {
  const { request_id } = params;
  try {
    if (!API_BASE_URL) {
      throw new Error('NEXT_PUBLIC_API_URL environment variable is not configured');
    }

    const fullApiUrl = `${API_BASE_URL}/api/summary/${request_id}`;

    let response;
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      response = await fetch(fullApiUrl, {
        headers: {
          Accept: 'application/json'
        }
      });
      if (response.ok || response.status !== 404) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }

    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      let errorBody = {};
      if (contentType && contentType.includes('application/json')) {
        errorBody = await response.json();
      } else {
        const text = await response.text();
        errorBody = { error: text.slice(0, 100) };
      }

      return NextResponse.json(errorBody, {
        status: response.status,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(`Invalid response format: ${text.slice(0, 100)}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error proxying request to API:', error);
    console.error('API URL used:', `${API_BASE_URL}/api/summary/${params?.request_id}`);

    return NextResponse.json(
      { error: 'Failed to fetch summary' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
