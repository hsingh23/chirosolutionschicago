import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle image requests
  if (
    pathname.match(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/) ||
    pathname.startsWith('/_next/image') ||
    pathname.startsWith('/images/')
  ) {
    const response = NextResponse.next()
    
    // Set cache control headers for images
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    )
    
    return response
  }

  return NextResponse.next()
}