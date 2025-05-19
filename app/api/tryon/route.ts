import { NextResponse } from 'next/server';

const BASE_URL = 'https://api.fashn.ai/v1';
const API_KEY = process.env.FASHNAI_KEY;

type RunResponse = {
  id: string;
  status: string;
};

type StatusResponse = {
  status: string;
  output?: string[];
  error?: string;
};

export async function POST(request: Request) {
  if (!API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { modelImage, garmentImage, category = 'tops' } = body;

    if (!modelImage || !garmentImage) {
      return NextResponse.json({ error: 'Missing modelImage or garmentImage' }, { status: 400 });
    }

    // Step 1: Trigger /run
    const runRes = await fetch(`${BASE_URL}/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model_image: modelImage,
        garment_image: garmentImage,
        category,
      }),
    });

    if (!runRes.ok) {
      const err = await runRes.json();
      return NextResponse.json({ error: err?.error || 'Failed to initiate prediction' }, { status: 500 });
    }

    const { id }: RunResponse = await runRes.json();

    // Step 2: Poll /status/:id
    let attempts = 0;
    const maxAttempts = 20;
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    while (attempts < maxAttempts) {
      const statusRes = await fetch(`${BASE_URL}/status/${id}`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      if (!statusRes.ok) {
        return NextResponse.json({ error: 'Failed to check status' }, { status: 500 });
      }

      const statusData: StatusResponse = await statusRes.json();

      if (statusData.status === 'completed' && statusData.output) {
        return NextResponse.json({ image: statusData.output[0] });
      }

      if (statusData.status === 'failed') {
        return NextResponse.json({ error: statusData.error || 'Prediction failed' }, { status: 500 });
      }

      attempts++;
      await delay(3000);
    }

    return NextResponse.json({ error: 'Prediction timed out' }, { status: 504 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
