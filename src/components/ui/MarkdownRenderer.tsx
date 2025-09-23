'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { memo, useEffect, useRef } from 'react'
import Image from 'next/image'
import mermaid from 'mermaid'

interface MarkdownRendererProps {
  content: string
  className?: string
}

// Mermaid component for rendering diagrams
const MermaidDiagram = memo(({ chart }: { chart: string }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      // Initialize mermaid with dark theme
      mermaid.initialize({
        startOnLoad: true,
        theme: 'dark',
        themeVariables: {
          primaryColor: '#ef4444',
          primaryTextColor: '#ffffff',
          primaryBorderColor: '#ef4444',
          lineColor: '#6b7280',
          secondaryColor: '#374151',
          tertiaryColor: '#111827',
          background: '#000000',
          mainBkg: '#111827',
          secondBkg: '#1f2937',
          tertiaryBkg: '#374151'
        },
        flowchart: {
          htmlLabels: true,
          curve: 'linear',
          useMaxWidth: true,
          padding: 20
        },
        gantt: {
          useMaxWidth: true
        },
        sequence: {
          useMaxWidth: true
        },
        journey: {
          useMaxWidth: true
        }
      })

      // Generate unique ID for this diagram
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`

      // Render the diagram
      mermaid.render(id, chart).then(({ svg }) => {
        if (ref.current) {
          ref.current.innerHTML = svg
        }
      }).catch((error) => {
        console.error('Mermaid rendering error:', error)
        if (ref.current) {
          ref.current.innerHTML = `<div class="text-red-400 p-4 border border-red-600/30 rounded bg-red-600/10">
            <p><strong>Mermaid Diagram Error:</strong></p>
            <pre class="text-sm mt-2">${error.message}</pre>
          </div>`
        }
      })
    }
  }, [chart])

  return (
    <div className="my-6 w-full">
      <div
        ref={ref}
        className="bg-gray-900 border border-gray-700 rounded-lg p-6 overflow-x-auto w-full"
        style={{ minHeight: '400px' }}
      />
    </div>
  )
})

MermaidDiagram.displayName = 'MermaidDiagram'

export const MarkdownRenderer = memo(({ content, className = "" }: MarkdownRendererProps) => {
  return (
    <div className={`prose prose-invert prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom heading components with proper styling
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold text-white mb-6 mt-8 border-b border-gray-700 pb-4 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-semibold text-white mb-4 mt-8 border-b border-gray-800 pb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xl font-semibold text-gray-200 mb-3 mt-4">
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-lg font-semibold text-gray-300 mb-2 mt-4">
              {children}
            </h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-base font-semibold text-gray-400 mb-2 mt-3">
              {children}
            </h6>
          ),
          
          // Paragraph styling
          p: ({ children }) => (
            <p className="text-gray-300 leading-relaxed mb-4">
              {children}
            </p>
          ),
          
          // List styling
          ul: ({ children }) => (
            <ul className="list-none ml-0 mb-4 space-y-2">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-none ml-0 mb-4 space-y-2">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-300 leading-relaxed flex items-start">
              <span className="text-red-400 mr-3 mt-1 flex-shrink-0">
                •
              </span>
              <span>{children}</span>
            </li>
          ),
          
          // Link styling
          a: ({ href, children }) => (
            <a 
              href={href}
              className="text-red-400 hover:text-red-300 underline transition-colors duration-200"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
          
          // Code styling with Mermaid support
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          code: (props: any) => {
            const { inline, className, children, ...restProps } = props
            const match = /language-(\w+)/.exec(className || '')

            if (!inline && match) {
              const language = match[1]
              const codeContent = String(children).replace(/\n$/, '')

              // Handle Mermaid diagrams
              if (language === 'mermaid') {
                return <MermaidDiagram chart={codeContent} />
              }

              return (
                <div className="my-6">
                  <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-lg">
                    <div className="px-4 py-2 bg-gray-800 text-gray-400 text-sm font-mono flex items-center justify-between">
                      <span className="capitalize">{language}</span>
                      <button
                        onClick={() => navigator.clipboard.writeText(codeContent)}
                        className="text-gray-500 hover:text-gray-300 transition-colors text-xs"
                        title="Copy to clipboard"
                      >
                        Copy
                      </button>
                    </div>
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={language}
                      PreTag="div"
                      className="!bg-gray-900 !m-0"
                      customStyle={{
                        background: 'transparent',
                        padding: '1rem',
                        margin: 0,
                        fontSize: '0.875rem'
                      }}
                      {...restProps}
                    >
                      {codeContent}
                    </SyntaxHighlighter>
                  </div>
                </div>
              )
            }

            return (
              <code
                className="bg-gray-800 text-red-400 px-2 py-1 rounded text-sm font-mono"
                {...restProps}
              >
                {children}
              </code>
            )
          },
          
          // Blockquote styling
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-red-600 pl-6 py-2 my-6 bg-gray-800/50 rounded-r-lg">
              <div className="text-gray-300 italic">
                {children}
              </div>
            </blockquote>
          ),
          
          // Table styling
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full border-collapse border border-gray-700 rounded-lg overflow-hidden">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-gray-700 bg-gray-800 px-4 py-2 text-left font-semibold text-white">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-700 px-4 py-2 text-gray-300">
              {children}
            </td>
          ),
          
          // Horizontal rule
          hr: () => (
            <hr className="border-t border-gray-700 my-8" />
          ),
          
          // Strong and emphasis
          strong: ({ children }) => (
            <strong className="text-white font-semibold">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="text-gray-200 italic">
              {children}
            </em>
          ),
          
          // Image styling
          img: ({ src, alt }) => (
            <div className="my-6">
              <Image
                src={typeof src === 'string' ? src : ''}
                alt={alt || ''}
                width={800}
                height={600}
                className="rounded-lg max-w-full h-auto mx-auto shadow-lg"
              />
              {alt && (
                <p className="text-center text-gray-400 text-sm mt-2 italic">
                  {alt}
                </p>
              )}
            </div>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
})

MarkdownRenderer.displayName = 'MarkdownRenderer'