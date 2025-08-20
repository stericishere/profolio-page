import { notFound } from 'next/navigation'
import { projectsData } from '@/data/portfolioData'
import BlogPostClient from './BlogPostClient'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // Find the project by slug
  const { slug } = await params
  const allProjects = projectsData.flatMap(section => section.items)
  const project = allProjects.find(p => p.id === slug)

  if (!project) {
    notFound()
  }

  return <BlogPostClient project={project} />
}