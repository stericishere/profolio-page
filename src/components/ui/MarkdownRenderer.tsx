'use client'

import { memo } from 'react'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export const MarkdownRenderer = memo(({ content, className = "" }: MarkdownRendererProps) => {
  // Simple markdown parser for our blog content
  const parseMarkdown = (text: string) => {
    // Split by double newlines to get sections
    const sections = text.split('\n\n')
    
    return sections.map((section, index) => {
      // Handle headers
      if (section.startsWith('## ')) {
        const headerText = section.replace('## ', '').trim()
        return (
          <h2 key={index} className="text-2xl font-bold mb-4 text-white mt-8 first:mt-0">
            {headerText}
          </h2>
        )
      }
      
      if (section.startsWith('### ')) {
        const headerText = section.replace('### ', '').trim()
        return (
          <h3 key={index} className="text-xl font-semibold mb-3 text-white mt-6">
            {headerText}
          </h3>
        )
      }
      
      if (section.startsWith('#### ')) {
        const headerText = section.replace('#### ', '').trim()
        return (
          <h4 key={index} className="text-lg font-semibold mb-2 text-gray-200 mt-4">
            {headerText}
          </h4>
        )
      }
      
      // Handle code blocks
      if (section.includes('```')) {
        const codeMatch = section.match(/```(\w+)?\n([\s\S]*?)```/)
        if (codeMatch) {
          const language = codeMatch[1] || 'text'
          const code = codeMatch[2]
          return (
            <div key={index} className="my-6">
              <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
                <div className="px-4 py-2 bg-gray-800 text-gray-400 text-sm font-mono">
                  {language}
                </div>
                <pre className="p-4 overflow-x-auto">
                  <code className="text-gray-300 font-mono text-sm leading-relaxed">
                    {code}
                  </code>
                </pre>
              </div>
            </div>
          )
        }
      }
      
      // Handle lists
      if (section.includes('- **') || section.includes('- ')) {
        const lines = section.split('\n').filter(line => line.trim())
        return (
          <ul key={index} className="space-y-2 mb-6 text-gray-300">
            {lines.map((line, lineIndex) => {
              if (line.startsWith('- **')) {
                // Bold list items
                const match = line.match(/- \*\*(.*?)\*\*:(.*)/)
                if (match) {
                  return (
                    <li key={lineIndex} className="flex">
                      <span className="text-red-400 font-semibold mr-2">•</span>
                      <div>
                        <strong className="text-white">{match[1]}</strong>
                        <span className="text-gray-300">:{match[2]}</span>
                      </div>
                    </li>
                  )
                }
              }
              if (line.startsWith('- ')) {
                return (
                  <li key={lineIndex} className="flex">
                    <span className="text-red-400 mr-2">•</span>
                    <span>{line.replace('- ', '')}</span>
                  </li>
                )
              }
              return null
            })}
          </ul>
        )
      }
      
      // Handle numbered lists
      if (section.match(/^\d+\./m)) {
        const lines = section.split('\n').filter(line => line.trim())
        return (
          <ol key={index} className="space-y-2 mb-6 text-gray-300 counter-reset">
            {lines.map((line, lineIndex) => {
              const match = line.match(/^(\d+)\.\s*(.*)/)
              if (match) {
                return (
                  <li key={lineIndex} className="flex">
                    <span className="text-red-400 font-semibold mr-3 min-w-[1.5rem]">
                      {match[1]}.
                    </span>
                    <span>{match[2]}</span>
                  </li>
                )
              }
              return null
            })}
          </ol>
        )
      }
      
      // Handle regular paragraphs with inline formatting
      if (section.trim()) {
        let formattedText = section
        
        // Handle bold text
        formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
        
        // Handle code spans
        formattedText = formattedText.replace(/`(.*?)`/g, '<code class="bg-gray-800 text-red-400 px-2 py-1 rounded text-sm font-mono">$1</code>')
        
        // Handle links (basic)
        formattedText = formattedText.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">$1</a>')
        
        return (
          <p 
            key={index} 
            className="text-gray-300 leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: formattedText }}
          />
        )
      }
      
      return null
    }).filter(Boolean)
  }
  
  return (
    <div className={`markdown-content ${className}`}>
      {parseMarkdown(content)}
    </div>
  )
})

MarkdownRenderer.displayName = 'MarkdownRenderer'