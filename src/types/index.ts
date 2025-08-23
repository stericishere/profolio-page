export type PersonaType = 'recruiter' | 'developer' | 'stalker' | 'adventurer';

export interface Persona {
  id: PersonaType;
  name: string;
  description: string;
  avatar: string;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
}

// Global window extensions for development utilities
declare global {
  interface Window {
    resetNetflixOpening: () => void;
    resetPersonaSelection: () => void;
  }
}