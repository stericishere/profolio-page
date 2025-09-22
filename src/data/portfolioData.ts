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
  projectImg?: string // Project image filename in public/assets/projects/
  type: 'project' | 'experience' | 'skill' | 'achievement' | 'contact'
  category?: 'Full Stack' | 'AI/ML' | 'Research' // Project category
  // Experience-specific properties
  experienceType?: 'internship' | 'research' | 'engineering' | 'professional'
  // Skill-specific properties
  date?: string
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
    title: "Today's Top Picks for Recruiter",
    items: [
      {
        id: 'work-visa-status',
        title: 'Work Authorization',
        subtitle: 'CO-OP Work Permit',
        technologies: ['CO-OP Work Permit', 'Internship Ready', 'University of Toronto'],
        link: '/work-authorization',
        type: 'contact'
      },
      {
        id: 'Experience',
        title: 'Experience',
        subtitle: 'Award-Winning prototype',
        description: '',
        technologies: ['PyTorch', 'Azure ML', 'TCN', 'Computer Vision'],
        link: '/experience',
        type: 'experience'
      },
      {
        id: 'Projects',
        title: 'Projects',
        subtitle: 'ML/RL + Multi-agent system',
        description: '',
        technologies: ['RL Game play Project', 'AI multi-agent Project', 'Project', 'Research'],
        link: '/projects',
        github: 'https://github.com/utmgdsc/TinyProof',
        type: 'project'
      },
      {
        id: 'Contact',
        title: 'Ready to Discuss Opportunities',
        subtitle: "Let's talk about your AI/ML roles",
        description: '',
        technologies: ['Summer Intern', 'CO-OP Intern', 'Remote/Hybrid', "Fall/Winter"],
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
        title: 'ProjectsML/RL + Multi-agent system',
        subtitle: 'ML/RL + Multi-agent system',
        description: '',
        technologies: ['RL Game play Project', 'AI multi-agent Project', 'Project', 'Research'],
        link: '/projects',
        github: 'https://github.com/utmgdsc/TinyProof',
        type: 'project'
      },
      {
        id: 'Skills',
        title: 'Skills',
        subtitle: 'Skill I have',
        description: '',
        technologies: ['Python', 'C++', 'Pytorch', 'numpy', 'C++', 'Scikit-learn', 'LangChain'],
        link: '/experience',
        type: 'experience'
      },
      {
        id: 'Experience',
        title: 'Experience',
        subtitle: 'Award-Winning prototype',
        description: '',
        technologies: ['PyTorch', 'Azure ML', 'TCN', 'Computer Vision'],
        link: '/experience',
        type: 'experience'
      },
      {
        id: 'Collaboration!',
        title: "Let's Work on Something Together",
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
        title: 'ProjectsML/RL + Multi-agent system',
        subtitle: 'ML/RL + Multi-agent system',
        description: '',
        technologies: ['RL Game play Project', 'AI multi-agent Project', 'Project', 'Research'],
        link: '/projects',
        github: 'https://github.com/utmgdsc/TinyProof',
        type: 'project'
      },
      {
        id: 'Skills',
        title: 'Skills',
        subtitle: 'Skill I have',
        description: '',
        technologies: ['Python', 'C++', 'Pytorch', 'numpy', 'C++'],
        link: '/experience',
        type: 'experience'
      },
      {
        id: 'Experience',
        title: 'Experience',
        subtitle: 'Award-Winning prototype',
        description: '',
        technologies: ['PyTorch', 'Azure ML', 'TCN', 'Computer Vision'],
        link: '/experience',
        type: 'experience'
      },
      {
        id: 'Connect',
        title: "Let's Connect!",
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
        id: 'Projects',
        title: 'ProjectsML/RL + Multi-agent system',
        subtitle: 'ML/RL + Multi-agent system',
        description: '',
        technologies: ['RL Game play Project', 'AI multi-agent Project', 'Project', 'Research'],
        link: '/projects',
        github: 'https://github.com/utmgdsc/TinyProof',
        type: 'project'
      },
      {
        id: 'Skills',
        title: 'Skills',
        subtitle: 'Skill I have',
        description: '',
        technologies: ['Python', 'C++', 'Pytorch', 'numpy', 'C++'],
        link: '/experience',
        type: 'experience'
      },
      {
        id: 'Experience',
        title: 'Experience',
        subtitle: 'Award-Winning prototype',
        description: '',
        technologies: ['PyTorch', 'Azure ML', 'TCN', 'Computer Vision'],
        link: '/experience',
        type: 'experience'
      },
      {
        id: 'Connect',
        title: "Let's Connect!",
        subtitle: 'For deeper conversations about AI and humanity',
        description: 'Interested in discussing AI consciousness, the singularity, or just want to share interesting articles? I love thoughtful conversations.',
        technologies: ['Deep Conversations', 'AI Philosophy', 'Future Studies'],
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
        projectImg: 'tinyproof.png',
        type: 'project',
        category: 'Research'
      },
      {
        id: 'ML-adaptive-education',
        title: 'Machine Learning for Adaptive Education',
        subtitle: '',
        description: '',
        technologies: ['PyTorch', 'NumPy', 'Machine Learning', 'Item Response Theory'],
        link: '#',
        github: 'https://github.com/stericishere/ML-for-Adaptive-Education',
        projectImg: 'adaptive-education.png',
        type: 'project',
        category: 'AI/ML'
      },
      {
        id: 'RL-agent-play-Mini-Motorway',
        title: 'RL agent play Mini-Motorway',
        subtitle: 'AI agent trained to play Mini-Motorway from pixels using Deep Q Learning',
        description: '',
        technologies: ['Python', 'PyBoy', 'Stable Baselines 3', 'PPO', 'Computer Vision'],
        link: '#',
        github: 'https://github.com/stericishere/RL-agent-play-Mini-Motorway',
        projectImg: 'mini-motorway.png',
        type: 'project',
        category: 'AI/ML'
      },
      {
        id: 'Generative-agents-simulation',
        title: 'Generative Agents: The Dating Show',
        subtitle: 'Multi-agent simulation using PIANO architecture',
        description: 'Re-architected the original Generative Agents framework using PIANO architecture.',
        technologies: ['LangGraph', 'Docker', 'LLM', 'Multi-Agent Systems'],
        link: '#',
        github: 'https://github.com/stericishere/generative_agents',
        projectImg: 'generative-agents.png',
        type: 'project',
        category: 'AI/ML'
      },
      {
        id: 'Netflix-portfolio',
        title: 'Netflix-Style Portfolio',
        subtitle: 'Interactive persona-based portfolio with animations',
        description: 'Portfolio blog',
        link: '#',
        technologies: ['Next.js', 'Typescript', 'Javascript'],
        github: 'https://github.com/stericishere/netflix-portfolio',
        projectImg: 'netflix-portfolio.png',
        type: 'project',
        category: 'Full Stack'
      },
      {
        id: 'fault-tolerant-system',
        title: 'Fault Tolerant Order Processing System',
        subtitle: 'Distributed microservices system with event-driven architecture',
        description: 'A fault-tolerant e-commerce backend with Order → Payment → Inventory → Shipping pipeline. Features RabbitMQ messaging, PostgreSQL databases, Docker deployment, and AWS CloudWatch monitoring.',
        technologies: ['Python', 'FastAPI', 'RabbitMQ', 'PostgreSQL', 'Docker', 'AWS EC2', 'CloudWatch'],
        link: 'http://3.80.195.219:8000/docs',
        github: 'https://github.com/stericishere/fault-tolerant-order-system',
        projectImg: 'fault-tolerant-system.png',
        type: 'project',
        category: 'Full Stack'
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
        id: 'researcher-utmist',
        title: 'Researcher',
        subtitle: 'UTMIST – University of Toronto Machine Intelligence Student Team',
        date: "Aug 2025 – Present",
        description: 'Improved real-time video quality by 50% in the Real-ESRGAN research by refining frame reconstruction algorithms and reducing visual artifacts\n• Achieved an 18% PSNR gain by optimizing GAN-based super-resolution models in PyTorch, through advanced loss function tuning (perceptual, SSIM) and architectural modifications\n• Exploring GPU acceleration and low-latency inference techniques to enable practical deployment in real-world applications',
        technologies: ['PyTorch', 'SciPy', 'Scikit-learn', 'Matplotlib', 'GCP', 'CUDA'],
        link: 'https://utmist.gitlab.io/',
        type: 'experience',
        experienceType: 'research'
      },
      {
        id: 'software-engineer-flymingos',
        title: 'Software Engineer Intern',
        subtitle: 'Flymingos',
        date: 'May 2025 – Aug 2025',
        description: 'Boosted lead match accuracy by 35% by architecting a semantic matching pipeline leveraging OpenAI embeddings and Chroma vector search, enabled intelligent pairing through real-time vector similarity scoring\n• Scaled backend infrastructure to support 500+ concurrent users by deploying a fully serverless architecture using Node.js Cloud Functions and Firebase, streamlined authentication and event-driven data workflows\n• Automated high-volume product data collection by building a robust Python scraping system with BeautifulSoup and custom parsing logic, reducing manual input by 40% and improving data accuracy across seller platforms',
        technologies: ['Node.js', 'Cloud Functions', 'Firebase', 'Python', 'BeautifulSoup'],
        link: 'https://munafah.ai/',
        type: 'experience',
        experienceType: 'internship'
      },
      {
        id: 'ml-engineer-squirl',
        title: 'ML Engineer',
        subtitle: 'Squirl Signs - Microsoft Startup Club and Backed by Alterna',
        date: 'Sep 2024 – April 2025',
        description: 'Reduced inference computation by 33% using a post-training dynamic frame sampling technique in Azure ML, prioritizing real-time smooth user experience without compromising model accuracy\n• Optimized to a Temporal Convolutional Network (TCN) by performing a grid search over key hyperparameters and implementing a Cosine Annealing scheduler, resulting in an award-winning prototype\n• Selected for the Microsoft Startup Club and funded by Alterna Savings to develop a B2B ASL translator',
        technologies: ['PyTorch', 'Azure ML', 'TCN', 'Pandas', 'NumPy', 'Computer Vision'],
        link: 'https://www.squirlsigns.com/',
        type: 'experience',
        experienceType: 'professional'
      },
      {
        id: 'research-assistant-uoft',
        title: 'Research Assistant',
        date: 'Jan 2024 – April 2025',
        subtitle: 'University of Toronto',
        description: 'Conducted original research under Dr. Mohammad to build an RL-based theorem prover extending AlphaProof using R\'max Tree Search, achieving 87% on college-level proofs surpassing expected baselines\n• Extract over 100k+ proof data by engineered a scalable ETL data pipeline in GCP, leveraging LeanDojo to transform data into usable structured datasets from different repositories for downstream training\n• Containerized workflows with Docker and coordinated iterations via Jira, ensuring reproducibility across research',
        technologies: ['PyTorch', 'Google Cloud Platform', 'LeanDojo', 'Lean4', 'Docker', 'Jira'],
        link: 'https://github.com/utmgdsc/TinyProof',
        type: 'experience',
        experienceType: 'research'
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
