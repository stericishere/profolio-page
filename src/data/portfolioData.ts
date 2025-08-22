export interface PortfolioItem {
  id: string
  title: string
  subtitle: string
  description?: string
  blogContent?: string // Rich content for detailed blog posts
  technologies?: string[]
  link?: string
  github?: string
  image?: string
  type: 'project' | 'experience' | 'skill' | 'achievement' | 'contact'
  // Skill-specific properties
  proficiencyLevel?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  yearsOfExperience?: number
  relatedProjects?: string[] // Project IDs that use this skill
  relatedSkills?: string[] // Related skill IDs
  certifications?: string[]
  learningResources?: string[]
}

export interface PortfolioSection {
  id: string
  title: string
  items: PortfolioItem[]
}

export const topPicksData: PortfolioSection[] = [
  {
    id: 'top-picks-recruiter',
    title: 'Today\'s Top Picks for Recruiter',
    items: [
      {
        id: 'work-visa-status',
        title: 'Work Authorization',
        subtitle: 'CO-OP Work Permit - Ready for Internships',
        technologies: ['CO-OP Work Permit', 'Internship Ready', 'University of Toronto'],
        link: '/work-authorization',
        type: 'contact'
      },
      {
        id: 'Experience',
        title: 'Experience',
        subtitle: 'Award-Winning prototype',
        technologies: ['PyTorch', 'Azure ML', 'TCN', 'Computer Vision'],
        link: '/experience',
        type: 'experience'
      },
      {
        id: 'Projects',
        title: 'ML/RL + Multi-agent system',
        subtitle: '87% accuracy on college-level theorem proving',
        technologies: ['RL Game play Project', 'AI multi-agent Project', 'Project', 'Research'],
        link: '/projects',
        github: 'https://github.com/utmgdsc/TinyProof',
        type: 'project'
      },
      {
        id: 'Contact',
        title: 'Ready to Discuss Opportunities',
        subtitle: 'Let\'s talk about your AI/ML roles',
        technologies: ['Fall/Winter', 'Competitive Salary', 'Remote/Hybrid'],
        link: '/contact',
        type: 'contact'
      }
    ]
  },
  {
    id: 'top-picks-developer',
    title: 'Today\'s Top Picks for Developer',
    items: [
      {
        id: 'Projects',
        title: 'ML/RL + Multi-agent system',
        subtitle: '87% accuracy on college-level theorem proving',
        technologies: ['RL Game play Project', 'AI multi-agent Project', 'Project', 'Research'],
        link: '/projects',
        github: 'https://github.com/utmgdsc/TinyProof',
        type: 'project'
      },
      {
        id: 'Skills',
        title: 'Skills',
        subtitle: 'What skill do I have!',
        technologies: ['Python', 'C++', 'Pytorch', 'numpy', 'C++'],
        link: '/experience',
        type: 'experience'
      },
      {
        id: 'Experience',
        title: 'Experience',
        subtitle: 'Award-Winning prototype',
        technologies: ['PyTorch', 'Azure ML', 'TCN', 'Computer Vision'],
        link: '/experience',
        type: 'experience'
      },
      {
        id: 'collaboration-invite',
        title: 'Let\'s Work on Something Together',
        subtitle: 'Always excited about new technical challenges',
        description: 'Got an interesting problem to solve? Want to pair program or collaborate on an open source project? Let\'s build something awesome!',
        technologies: ['Collaboration', 'Pair Programming', 'Innovation'],
        link: '/contact',
        type: 'contact'
      }
    ]
  },
  {
    id: 'top-picks-stalker',
    title: 'Today\'s Top Picks for Stalker',
    items: [
      {
        id: 'Projects',
        title: 'Projects',
        subtitle: 'Original research in theorem proving and RL',
        description: 'Deep dive into my TinyProof research extending AlphaProof, plus insights into R\'max Tree Search algorithms and formal theorem proving.',
        technologies: ['Research', 'Theorem Proving', 'RL', 'Academic Writing'],
        link: '/projects',
        github: 'https://github.com/utmgdsc/TinyProof',
        type: 'project'
      },
      {
        id: 'technical-certifications',
        title: 'Cloud & ML Certifications',
        subtitle: 'AWS, Oracle, and Google Cloud credentials',
        description: 'Certified in AWS Machine Learning Engineer-Associate, Oracle Cloud Foundations, and Google Cloud Essentials. Deep technical knowledge across platforms.',
        technologies: ['AWS', 'Oracle Cloud', 'Google Cloud', 'MLOps'],
        link: '/skills',
        type: 'achievement'
      },
      {
        id: 'conference-involvement',
        title: 'UofT AI Conference Associate',
        subtitle: 'AI community building and organization',
        description: 'Contributing to AI conference organization at University of Toronto. Building bridges between academia and industry in the AI community.',
        technologies: ['AI Community', 'Conference Planning', 'Networking'],
        link: '/experience',
        type: 'experience'
      },
      {
        id: 'connect-stalker',
        title: 'Let\'s Connect!',
        subtitle: 'For deeper conversations about AI and humanity',
        description: 'Interested in discussing AI consciousness, the singularity, or just want to share interesting articles? I love thoughtful conversations.',
        technologies: ['Deep Conversations', 'AI Philosophy', 'Future Studies'],
        link: '/contact',
        type: 'contact'
      }
    ]
  },
  {
    id: 'top-picks-adventurer',
    title: 'Today\'s Top Picks for Adventurer',
    items: [
      {
        id: 'pokemon-rl-adventure',
        title: 'PokemonRed RL Agent',
        subtitle: 'Training AI to master retro games',
        description: 'Built an AI agent that learns to play Pokémon Red from pixels using PPO and advanced reward shaping. Tackled complex exploration challenges and emergent behaviors.',
        technologies: ['Reinforcement Learning', 'Game AI', 'PyBoy', 'PPO'],
        link: '/projects',
        type: 'project'
      },
      {
        id: 'adaptive-education-ml',
        title: 'Adaptive Education ML Model',
        subtitle: '75% accuracy in student performance prediction',
        description: 'Enhanced traditional Item Response Theory (IRT) to create personalized learning experiences. Outperformed neural networks and ensemble methods in team collaboration.',
        technologies: ['Machine Learning', 'Education Tech', 'IRT', 'PyTorch'],
        link: '/projects',
        type: 'project'
      },
      {
        id: 'multi-agent-dating',
        title: 'Generative Agents Dating Show',
        subtitle: 'Complex social AI simulation',
        description: 'Re-architected Generative Agents using PIANO architecture for realistic multi-agent social interactions. Built real-time agent behavior visualization system.',
        technologies: ['LangGraph', 'Multi-Agent Systems', 'Social AI'],
        link: '/projects',
        type: 'project'
      },
      {
        id: 'adventure-together',
        title: 'Want to Go on an Adventure Together?',
        subtitle: 'Let\'s explore uncharted technical territories',
        description: 'Ready to tackle impossible problems, build something nobody has tried, or just embark on an intellectual adventure? I\'m in!',
        technologies: ['Bold Ideas', 'Risk Taking', 'Innovation'],
        link: '/contact',
        type: 'contact'
      }
    ]
  }
]

export const projectsData: PortfolioSection[] = [
  {
    id: 'featured-projects',
    title: 'Featured Projects',
    items: [
      {
        id: 'tinyproof',
        title: 'TinyProof',
        subtitle: 'RL-based theorem prover extending from AlphaProof',
        description: '',
        technologies: ['PyTorch', 'Google Cloud Platform', 'LeanDojo', 'Lean4', 'Docker', 'Reinforcement Learning'],
        link: '#',
        github: 'https://github.com/utmgdsc/TinyProof',
        type: 'project'
      },
      {
        id: 'adaptive-education-ml',
        title: 'Machine Learning Model for Adaptive Education',
        subtitle: '',
        technologies: ['PyTorch', 'NumPy', 'Machine Learning', 'Item Response Theory'],
        link: '#',
        github: '#',
        type: 'project'
      },
      {
        id: 'pokemon-rl-agent',
        title: 'PokemonRed -- RL Game-Playing Agent',
        subtitle: 'AI agent trained to play Pokémon Red from pixels',
        description: 'Applied RL to train an AI agent using PyBoy and Stable Baselines 3. Developed CNN-based policy network using PPO with frame stacking and auxiliary memory features. Engineered reward shaping strategies to guide learning.',
        technologies: ['Python', 'PyBoy', 'Stable Baselines 3', 'PPO', 'Computer Vision'],
        link: '#',
        github: '#',
        type: 'project'
      },
      {
        id: 'generative-agents-dating',
        title: 'Generative Agents: The Dating Show',
        subtitle: 'Multi-agent simulation using PIANO architecture',
        description: 'Re-architected the original Generative Agents framework using PIANO architecture. Designed a novel "dating show" simulation demonstrating complex multi-agent interaction. Developed interactive "follow an agent" feature for real-time behavior visualization.',
        technologies: ['LangGraph', 'Docker', 'LLM', 'Multi-Agent Systems'],
        link: '#',
        github: '#',
        type: 'project'
      },
      {
        id: 'netflix-portfolio',
        title: 'Netflix-Style Portfolio',
        subtitle: 'Interactive persona-based portfolio with animations',
        description: 'A revolutionary portfolio website that reimagines professional presentation through Netflix\'s engaging interface paradigm. Features persona-based content delivery, advanced performance optimization, and scroll-based lazy loading. Built with Next.js 15, TypeScript, and Framer Motion for a smooth, responsive experience.',
        link: '#',
        github: 'https://github.com/stericishere/netflix-portfolio',
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
        id: 'ml-engineer-squirl',
        title: 'ML Engineer',
        subtitle: 'Squirl ASL | Sep 2024 - April 2025',
        description: 'Fine-tuned Temporal Convolutional Networks (TCN) for award-winning ASL recognition prototype. Reduced inference computation by 33% using dynamic frame sampling in Azure ML. Improved F1 score by 22% through dataset quality enhancement.',
        technologies: ['PyTorch', 'Azure ML', 'TCN', 'Pandas', 'NumPy', 'Computer Vision'],
        type: 'experience'
      },
      {
        id: 'conference-associate',
        title: 'Conference Associate',
        subtitle: 'UofT AI | Jun 2024 - Present',
        description: 'Contributing to AI conference organization and community building at University of Toronto. Supporting AI research and networking initiatives.',
        technologies: ['Event Planning', 'AI Community', 'Research Support'],
        type: 'experience'
      }
    ]
  }
]

export const skillsData: PortfolioSection[] = [
  {
    id: 'programming-languages',
    title: 'Programming Languages',
    items: [
      {
        id: 'python',
        title: 'Python',
        subtitle: 'Primary AI/ML Language',
        description: 'Expert-level proficiency in Python for machine learning, data science, and backend development. Used extensively in research projects and production systems.',
        image: 'https://svglogos.dev/logos/python.svg',
        type: 'skill',
        proficiencyLevel: 'Expert',
        yearsOfExperience: 4,
        relatedProjects: ['tinyproof', 'adaptive-education-ml', 'pokemon-rl-agent'],
        relatedSkills: ['pytorch', 'pandas', 'numpy', 'scikit-learn'],
        certifications: ['AWS ML Engineer-Associate']
      },
      {
        id: 'cpp',
        title: 'C++',
        subtitle: 'Systems Programming',
        description: 'Performance-critical applications and algorithm implementation. Used for competitive programming and system-level development.',
        image: 'https://svglogos.dev/logos/c-plusplus.svg',
        type: 'skill',
        proficiencyLevel: 'Advanced',
        yearsOfExperience: 3,
        relatedProjects: [],
        relatedSkills: ['java']
      },
      {
        id: 'java',
        title: 'Java',
        subtitle: 'OOP Language',
        description: 'Enterprise applications and algorithm implementation. Strong foundation in object-oriented programming principles.',
        image: 'https://svglogos.dev/logos/java.svg',
        type: 'skill',
        proficiencyLevel: 'Advanced',
        yearsOfExperience: 3,
        relatedProjects: [],
        relatedSkills: ['cpp']
      },
      {
        id: 'javascript',
        title: 'JavaScript',
        subtitle: 'Full-Stack Development',
        description: 'Modern JavaScript for frontend and backend development. Experience with ES6+, async programming, and modern frameworks.',
        image: 'https://svglogos.dev/logos/javascript.svg',
        type: 'skill',
        proficiencyLevel: 'Advanced',
        yearsOfExperience: 3,
        relatedProjects: ['netflix-portfolio'],
        relatedSkills: ['html']
      },
      {
        id: 'html',
        title: 'HTML/CSS',
        subtitle: 'Web Technologies',
        description: 'Frontend web development and styling. Proficient in responsive design, modern CSS features, and web accessibility.',
        image: 'https://svglogos.dev/logos/html-5.svg',
        type: 'skill',
        proficiencyLevel: 'Advanced',
        yearsOfExperience: 3,
        relatedProjects: ['netflix-portfolio'],
        relatedSkills: ['javascript']
      }
    ]
  },
  {
    id: 'ml-frameworks',
    title: 'ML/AI Frameworks',
    items: [
      {
        id: 'pytorch',
        title: 'PyTorch',
        subtitle: 'Deep Learning Framework',
        description: 'Primary framework for deep learning research and production. Extensive experience with neural networks, reinforcement learning, and model optimization.',
        image: 'https://svglogos.dev/logos/pytorch.svg',
        type: 'skill',
        proficiencyLevel: 'Expert',
        yearsOfExperience: 3,
        relatedProjects: ['tinyproof', 'adaptive-education-ml', 'pokemon-rl-agent'],
        relatedSkills: ['python', 'numpy', 'pandas'],
        certifications: ['AWS ML Engineer-Associate']
      },
      {
        id: 'pandas',
        title: 'Pandas',
        subtitle: 'Data Analysis Library',
        description: 'Data manipulation and analysis for ML projects. Expert in data cleaning, transformation, and feature engineering.',
        image: 'https://svglogos.dev/logos/pandas.svg',
        type: 'skill',
        proficiencyLevel: 'Expert',
        yearsOfExperience: 4,
        relatedProjects: ['adaptive-education-ml'],
        relatedSkills: ['python', 'numpy', 'jupyter']
      },
      {
        id: 'numpy',
        title: 'NumPy',
        subtitle: 'Numerical Computing',
        description: 'Foundation for scientific computing in Python. Proficient in array operations, linear algebra, and mathematical functions.',
        image: 'https://svglogos.dev/logos/numpy.svg',
        type: 'skill',
        proficiencyLevel: 'Expert',
        yearsOfExperience: 4,
        relatedProjects: ['adaptive-education-ml', 'tinyproof'],
        relatedSkills: ['python', 'pandas', 'pytorch']
      },
      {
        id: 'scikit-learn',
        title: 'Scikit-learn',
        subtitle: 'Classical Machine Learning',
        description: 'Traditional ML algorithms and data preprocessing. Experience with classification, regression, clustering, and model evaluation.',
        image: 'https://svglogos.dev/logos/scikit-learn.svg',
        type: 'skill',
        proficiencyLevel: 'Advanced',
        yearsOfExperience: 3,
        relatedProjects: ['adaptive-education-ml'],
        relatedSkills: ['python', 'pandas', 'numpy']
      },
      {
        id: 'langchain',
        title: 'LangChain',
        subtitle: 'LLM Application Framework',
        description: 'Building LLM-powered applications and RAG systems. Experience with multi-agent systems and LLM orchestration.',
        image: 'https://svglogos.dev/logos/langchain.svg',
        type: 'skill',
        proficiencyLevel: 'Advanced',
        yearsOfExperience: 1,
        relatedProjects: ['generative-agents-dating'],
        relatedSkills: ['python', 'docker']
      }
    ]
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    items: [
      {
        id: 'gcp',
        title: 'GCP',
        subtitle: 'Google Cloud Platform',
        description: 'Certified experience with GCP services for ML. Proficient in Compute Engine, Cloud Storage, and ML services.',
        image: 'https://svglogos.dev/logos/google-cloud.svg',
        type: 'skill',
        proficiencyLevel: 'Advanced',
        yearsOfExperience: 2,
        relatedProjects: ['tinyproof'],
        relatedSkills: ['docker', 'python'],
        certifications: ['Google Cloud Essentials']
      },
      {
        id: 'azure',
        title: 'Azure',
        subtitle: 'Microsoft Cloud Platform',
        description: 'Azure ML for model training and deployment. Experience with Azure Machine Learning Studio and cloud-based ML pipelines.',
        image: 'https://svglogos.dev/logos/microsoft-azure.svg',
        type: 'skill',
        proficiencyLevel: 'Advanced',
        yearsOfExperience: 1,
        relatedProjects: [],
        relatedSkills: ['pytorch', 'python'],
        certifications: []
      },
      {
        id: 'aws',
        title: 'AWS',
        subtitle: 'Cloud Platform',
        description: 'AWS ML Engineer-Associate certified. Experience with EC2, S3, Lambda, and SageMaker for ML workloads.',
        image: 'https://svglogos.dev/logos/aws.svg',
        type: 'skill',
        proficiencyLevel: 'Advanced',
        yearsOfExperience: 2,
        relatedProjects: [],
        relatedSkills: ['docker', 'python'],
        certifications: ['AWS ML Engineer-Associate']
      },
      {
        id: 'docker',
        title: 'Docker',
        subtitle: 'Containerization',
        description: 'Containerizing ML applications and microservices. Experience with multi-stage builds, networking, and orchestration.',
        image: 'https://svglogos.dev/logos/docker.svg',
        type: 'skill',
        proficiencyLevel: 'Advanced',
        yearsOfExperience: 2,
        relatedProjects: ['tinyproof', 'generative-agents-dating'],
        relatedSkills: ['gcp', 'aws', 'python']
      },
      {
        id: 'jupyter',
        title: 'Jupyter',
        subtitle: 'Interactive Computing',
        description: 'Research, prototyping, and data analysis. Expert in notebook development, widget creation, and reproducible research.',
        image: 'https://svglogos.dev/logos/jupyter.svg',
        type: 'skill',
        proficiencyLevel: 'Expert',
        yearsOfExperience: 4,
        relatedProjects: ['adaptive-education-ml', 'tinyproof'],
        relatedSkills: ['python', 'pandas', 'numpy']
      }
    ]
  },
  {
    id: 'databases',
    title: 'Databases',
    items: [
      {
        id: 'postgresql',
        title: 'PostgreSQL',
        subtitle: 'Relational Database',
        description: 'Advanced SQL and database design. Experience with complex queries, indexing, and performance optimization.',
        image: 'https://svglogos.dev/logos/postgresql.svg',
        type: 'skill',
        proficiencyLevel: 'Advanced',
        yearsOfExperience: 2,
        relatedProjects: [],
        relatedSkills: ['mysql', 'python']
      },
      {
        id: 'mysql',
        title: 'MySQL',
        subtitle: 'Relational Database',
        description: 'Database management and SQL queries. Proficient in database design, normalization, and data modeling.',
        image: 'https://svglogos.dev/logos/mysql.svg',
        type: 'skill',
        proficiencyLevel: 'Advanced',
        yearsOfExperience: 2,
        relatedProjects: [],
        relatedSkills: ['postgresql', 'python']
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