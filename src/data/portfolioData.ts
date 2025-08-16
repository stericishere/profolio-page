export interface PortfolioItem {
  id: string
  title: string
  subtitle: string
  description?: string
  technologies?: string[]
  link?: string
  github?: string
  image?: string
  type: 'project' | 'experience' | 'skill' | 'achievement' | 'contact'
}

export interface PortfolioSection {
  id: string
  title: string
  items: PortfolioItem[]
}

export const projectsData: PortfolioSection[] = [
  {
    id: 'featured-projects',
    title: 'Featured Projects',
    items: [
      {
        id: 'netflix-portfolio',
        title: 'Netflix-Style Portfolio',
        subtitle: 'Interactive persona-based portfolio with animations',
        description: 'A unique portfolio website inspired by Netflix\'s interface, featuring personalized content based on user personas (Recruiter, Developer, Stalker, Adventurer).',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        link: '#',
        github: 'https://github.com/sterictsui/netflix-portfolio',
        type: 'project'
      },
      {
        id: 'ecommerce-platform',
        title: 'E-commerce Platform',
        subtitle: 'Full-stack React & Node.js application',
        description: 'A comprehensive e-commerce solution with user authentication, product management, shopping cart, and payment processing.',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe API', 'AWS'],
        link: '#',
        github: '#',
        type: 'project'
      },
      {
        id: 'task-management-app',
        title: 'Task Management App',
        subtitle: 'React Native mobile application',
        description: 'Cross-platform mobile app for task management with real-time synchronization and offline support.',
        technologies: ['React Native', 'Firebase', 'Redux', 'TypeScript'],
        link: '#',
        github: '#',
        type: 'project'
      },
      {
        id: 'analytics-dashboard',
        title: 'Analytics Dashboard',
        subtitle: 'Data visualization with D3.js',
        description: 'Interactive dashboard for business analytics with real-time data visualization and reporting features.',
        technologies: ['React', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL'],
        link: '#',
        github: '#',
        type: 'project'
      },
      {
        id: 'api-gateway-service',
        title: 'API Gateway Service',
        subtitle: 'Microservices architecture',
        description: 'Scalable API gateway service handling authentication, rate limiting, and request routing for microservices.',
        technologies: ['Node.js', 'Docker', 'Kubernetes', 'Redis', 'MongoDB'],
        link: '#',
        github: '#',
        type: 'project'
      },
      {
        id: 'chat-app',
        title: 'Real-time Chat App',
        subtitle: 'WebSocket implementation',
        description: 'Real-time messaging application with group chats, file sharing, and video calling capabilities.',
        technologies: ['Next.js', 'Socket.io', 'WebRTC', 'Node.js', 'MongoDB'],
        link: '#',
        github: '#',
        type: 'project'
      }
    ]
  }
]

export const experienceData: PortfolioSection[] = [
  {
    id: 'work-experience',
    title: 'Professional Experience',
    items: [
      {
        id: 'senior-developer',
        title: 'Senior Full-Stack Developer',
        subtitle: 'Tech Corp | 2021 - 2024',
        description: 'Led development of large-scale web applications serving 100k+ users. Mentored junior developers and architected scalable solutions.',
        technologies: ['React', 'Node.js', 'AWS', 'TypeScript', 'PostgreSQL'],
        type: 'experience'
      },
      {
        id: 'fullstack-developer',
        title: 'Full-Stack Developer',
        subtitle: 'StartupXYZ | 2019 - 2021',
        description: 'Built MVP and scaled product from 0 to 10k users. Implemented CI/CD pipelines and optimized application performance.',
        technologies: ['Vue.js', 'Python', 'Docker', 'GCP', 'MongoDB'],
        type: 'experience'
      },
      {
        id: 'frontend-developer',
        title: 'Frontend Developer',
        subtitle: 'WebAgency | 2018 - 2019',
        description: 'Developed responsive websites and web applications for various clients. Collaborated with design teams to implement pixel-perfect UIs.',
        technologies: ['React', 'SCSS', 'JavaScript', 'WordPress', 'Figma'],
        type: 'experience'
      },
      {
        id: 'junior-developer',
        title: 'Junior Developer',
        subtitle: 'FirstJob Inc | 2017 - 2018',
        description: 'Started career as junior developer, learning modern web development practices and contributing to team projects.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
        type: 'experience'
      }
    ]
  }
]

export const skillsData: PortfolioSection[] = [
  {
    id: 'frontend-skills',
    title: 'Frontend Development',
    items: [
      {
        id: 'react-nextjs',
        title: 'React & Next.js',
        subtitle: 'Advanced proficiency in React ecosystem',
        description: 'Expert-level knowledge in React, Next.js, hooks, context, and state management libraries.',
        technologies: ['React', 'Next.js', 'Redux', 'Zustand', 'React Query'],
        type: 'skill'
      },
      {
        id: 'typescript',
        title: 'TypeScript',
        subtitle: 'Type-safe development',
        description: 'Strong expertise in TypeScript for building scalable and maintainable applications.',
        technologies: ['TypeScript', 'JavaScript', 'ESNext'],
        type: 'skill'
      },
      {
        id: 'styling',
        title: 'CSS & Styling',
        subtitle: 'Modern CSS techniques',
        description: 'Proficient in modern CSS, preprocessors, and CSS-in-JS solutions.',
        technologies: ['CSS3', 'Tailwind CSS', 'SCSS', 'Styled Components', 'Emotion'],
        type: 'skill'
      }
    ]
  },
  {
    id: 'backend-skills',
    title: 'Backend Development',
    items: [
      {
        id: 'nodejs',
        title: 'Node.js & Express',
        subtitle: 'Server-side JavaScript',
        description: 'Extensive experience building RESTful APIs and microservices with Node.js.',
        technologies: ['Node.js', 'Express', 'Fastify', 'NestJS'],
        type: 'skill'
      },
      {
        id: 'databases',
        title: 'Database Management',
        subtitle: 'SQL and NoSQL databases',
        description: 'Experience with various database systems and data modeling.',
        technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'DynamoDB'],
        type: 'skill'
      },
      {
        id: 'cloud-devops',
        title: 'Cloud & DevOps',
        subtitle: 'Infrastructure and deployment',
        description: 'Proficient in cloud platforms and DevOps practices.',
        technologies: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
        type: 'skill'
      }
    ]
  }
]

export const contactData: PortfolioSection[] = [
  {
    id: 'contact-info',
    title: 'Get In Touch',
    items: [
      {
        id: 'email',
        title: 'Email',
        subtitle: 'steric.tsui@mail.utoronto.ca',
        description: 'Feel free to reach out for opportunities or collaboration.',
        link: 'mailto:steric.tsui@mail.utoronto.ca',
        type: 'contact'
      },
      {
        id: 'linkedin',
        title: 'LinkedIn',
        subtitle: 'linkedin.com/in/steric-tsui',
        description: 'Connect with me on LinkedIn for professional networking.',
        link: 'https://linkedin.com/in/steric-tsui',
        type: 'contact'
      },
      {
        id: 'github',
        title: 'GitHub',
        subtitle: 'github.com/stericishere',
        description: 'Check out my code and contributions on GitHub.',
        link: 'https://github.com/stericishere',
        type: 'contact'
      },
      {
        id: 'portfolio',
        title: 'Portfolio Website',
        subtitle: 'steric-tsui.come',
        description: 'Visit my portfolio website for more information.',
        link: 'https://steric-tsui.come',
        type: 'contact'
      }
    ]
  }
]