'use client'

import { useState, useEffect } from 'react'

interface UseTypewriterOptions {
  words: string[]
  typeSpeed?: number
  deleteSpeed?: number
  delayBetweenWords?: number
  loop?: boolean
}

export function useTypewriter({
  words,
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBetweenWords = 2000,
  loop = true
}: UseTypewriterOptions) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)

  useEffect(() => {
    if (words.length === 0) return

    const currentWord = words[currentWordIndex]
    
    const timeout = setTimeout(() => {
      if (isWaiting) {
        setIsWaiting(false)
        setIsDeleting(true)
        return
      }

      if (isDeleting) {
        // Deleting characters
        setCurrentText(currentWord.substring(0, currentText.length - 1))
        
        if (currentText.length === 0) {
          setIsDeleting(false)
          if (loop || currentWordIndex < words.length - 1) {
            setCurrentWordIndex((prev) => (prev + 1) % words.length)
          }
        }
      } else {
        // Typing characters
        setCurrentText(currentWord.substring(0, currentText.length + 1))
        
        if (currentText.length === currentWord.length - 1) {
          setIsWaiting(true)
        }
      }
    }, isWaiting ? delayBetweenWords : isDeleting ? deleteSpeed : typeSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, currentWordIndex, isDeleting, isWaiting, words, typeSpeed, deleteSpeed, delayBetweenWords, loop])

  return {
    text: currentText,
    isTyping: !isDeleting && !isWaiting,
    isDeleting,
    isWaiting
  }
}