import fs from 'fs';
import path from 'path';

/**
 * Utility to load markdown content for project blog posts
 */

export interface MarkdownContent {
  content: string;
  slug: string;
  exists: boolean;
}

/**
 * Load markdown content for a specific project
 * @param slug - Project slug (e.g., 'tinyproof', 'pokemon-rl-agent')
 * @returns Promise<MarkdownContent>
 */
export async function loadProjectMarkdown(slug: string): Promise<MarkdownContent> {
  try {
    // First try exact match
    let markdownPath = path.join(process.cwd(), 'src', 'content', 'projects', `${slug}.md`);
    
    // If exact match doesn't exist, try case-insensitive match
    if (!fs.existsSync(markdownPath)) {
      const contentDir = path.join(process.cwd(), 'src', 'content', 'projects');
      if (fs.existsSync(contentDir)) {
        const files = fs.readdirSync(contentDir);
        const matchingFile = files.find(file => 
          file.toLowerCase() === `${slug.toLowerCase()}.md`
        );
        if (matchingFile) {
          markdownPath = path.join(contentDir, matchingFile);
        }
      }
    }
    
    // Check if file exists
    if (!fs.existsSync(markdownPath)) {
      return {
        content: '',
        slug,
        exists: false
      };
    }
    
    // Read and return markdown content
    const content = fs.readFileSync(markdownPath, 'utf-8');
    
    return {
      content,
      slug,
      exists: true
    };
  } catch (error) {
    console.error(`Error loading markdown for ${slug}:`, error);
    return {
      content: '',
      slug,
      exists: false
    };
  }
}

/**
 * Get all available project markdown files
 * @returns Promise<string[]> - Array of project slugs
 */
export async function getAvailableProjectSlugs(): Promise<string[]> {
  try {
    const contentDir = path.join(process.cwd(), 'src', 'content', 'projects');
    
    if (!fs.existsSync(contentDir)) {
      return [];
    }
    
    const files = fs.readdirSync(contentDir);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    // Return slugs (filenames without .md extension)
    return markdownFiles.map(file => file.replace('.md', ''));
  } catch (error) {
    console.error('Error getting available project slugs:', error);
    return [];
  }
}

/**
 * Check if markdown content exists for a project
 * @param slug - Project slug
 * @returns boolean
 */
export function hasMarkdownContent(slug: string): boolean {
  try {
    const markdownPath = path.join(process.cwd(), 'src', 'content', 'projects', `${slug}.md`);
    return fs.existsSync(markdownPath);
  } catch (error) {
    console.error(`Error checking markdown for ${slug}:`, error);
    return false;
  }
}