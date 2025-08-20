'use client'

import { memo } from 'react'
import { 
  DiPython, 
  DiJavascript1, 
  DiJava, 
  DiPostgresql, 
  DiMysql, 
  DiGit, 
  DiDocker,
  DiHtml5
} from 'react-icons/di'
import { 
  SiPytorch, 
  SiPandas, 
  SiNumpy, 
  SiScikitlearn, 
  SiGooglecloud, 
  SiJupyter, 
  SiFastapi, 
  SiStreamlit,
  SiCplusplus
} from 'react-icons/si'
import { VscAzure } from "react-icons/vsc"
import { FaAws } from "react-icons/fa"

interface DynamicIconProps {
  skillId: string
  className?: string
}

export const DynamicIcon = memo(({ skillId, className = "w-12 h-12" }: DynamicIconProps) => {
  // Icon component mapping
  const iconMap: { [key: string]: React.ReactNode } = {
    // Programming Languages
    'python': <DiPython className={`${className} text-yellow-400`} />,
    'cpp': <SiCplusplus className={`${className} text-blue-500`} />,
    'java': <DiJava className={`${className} text-orange-600`} />,
    'javascript': <DiJavascript1 className={`${className} text-yellow-500`} />,
    'html': <DiHtml5 className={`${className} text-orange-500`} />,
    
    // ML/AI Frameworks
    'pytorch': <SiPytorch className={`${className} text-orange-500`} />,
    'pandas': <SiPandas className={`${className} text-blue-400`} />,
    'numpy': <SiNumpy className={`${className} text-blue-500`} />,
    'scikit-learn': <SiScikitlearn className={`${className} text-orange-400`} />,
    
    // Cloud & DevOps
    'gcp': <SiGooglecloud className={`${className} text-blue-500`} />,
    'azure': <VscAzure className={`${className} text-blue-600`} />,
    'aws': <FaAws className={`${className} text-orange-400`} />,
    'docker': <DiDocker className={`${className} text-blue-500`} />,
    'jupyter': <SiJupyter className={`${className} text-orange-500`} />,
    
    // Databases
    'postgresql': <DiPostgresql className={`${className} text-blue-600`} />,
    'mysql': <DiMysql className={`${className} text-blue-500`} />,
    
    // Development Tools
    'git': <DiGit className={`${className} text-orange-600`} />,
    'fastapi': <SiFastapi className={`${className} text-green-500`} />,
    'streamlit': <SiStreamlit className={`${className} text-red-500`} />,
  }
  
  return iconMap[skillId] || (
    <div className={`${className} bg-red-600/20 rounded-lg flex items-center justify-center`}>
      <span className="text-red-400 text-xl font-bold">
        {skillId.charAt(0).toUpperCase()}
      </span>
    </div>
  )
})

DynamicIcon.displayName = 'DynamicIcon'