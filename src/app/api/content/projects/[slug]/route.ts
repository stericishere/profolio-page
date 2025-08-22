import { NextRequest, NextResponse } from 'next/server'
import { loadProjectMarkdown } from '@/utils/markdownLoader'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    
    // Load markdown content for the project
    const markdownData = await loadProjectMarkdown(slug)
    
    if (!markdownData.exists) {
      return NextResponse.json(
        { error: 'Markdown content not found' },
        { status: 404 }
      )
    }
    
    // Return the markdown content as plain text
    const cacheControl = process.env.NODE_ENV === 'development' 
      ? 'no-cache, no-store, must-revalidate' // No caching in development
      : 'public, max-age=3600' // Cache for 1 hour in production
    
    return new NextResponse(markdownData.content, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': cacheControl,
      },
    })
  } catch (error) {
    console.error('Error serving markdown content:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}