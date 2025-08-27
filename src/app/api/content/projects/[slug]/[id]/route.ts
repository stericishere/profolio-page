import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; id: string }> }
) {
  try {
    const { slug } = await params
    const filePath = join(process.cwd(), 'src', 'content', 'projects', `${slug}.md`)
    
    const content = await readFile(filePath, 'utf-8')
    
    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': process.env.NODE_ENV === 'development' ? 'no-store' : 'public, max-age=3600'
      }
    })
  } catch (error) {
    console.error('Error reading markdown file:', error)
    return new NextResponse('File not found', { status: 404 })
  }
}