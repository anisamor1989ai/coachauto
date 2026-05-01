import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  if (!url) return new NextResponse('Missing url', { status: 400 });
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'CoachAutoMaroc/1.0 (https://coachauto.vercel.app)',
        'Referer': 'https://coachauto.vercel.app',
      },
    });
    
    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch {
    return new NextResponse('Error fetching image', { status: 500 });
  }
}