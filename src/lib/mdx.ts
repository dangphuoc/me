import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content/blog');
const storiesDirectory = path.join(process.cwd(), 'content/stories');

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  readingTime: string;
  tags: string[];
  locale: string;
  thumbnail?: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readingTime: string;
  tags: string[];
  locale: string;
  thumbnail?: string;
}

/**
 * Get all unique slugs from a content directory
 */
function getContentSlugs(contentDir: string): string[] {
  try {
    if (!fs.existsSync(contentDir)) {
      return [];
    }

    const slugs = new Set<string>();
    const entries = fs.readdirSync(contentDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const dirPath = path.join(contentDir, entry.name);
        const files = fs.readdirSync(dirPath);
        if (files.some((f) => f.endsWith('.mdx'))) {
          slugs.add(entry.name);
        }
      } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
        const nameWithoutExt = entry.name.replace(/\.mdx$/, '');
        const match = nameWithoutExt.match(/^(.+)\.(vi|en)$/);
        if (match) {
          slugs.add(match[1]);
        } else {
          slugs.add(nameWithoutExt);
        }
      }
    }

    return Array.from(slugs);
  } catch {
    return [];
  }
}

/**
 * Get content by slug and locale from a content directory
 */
function getContentBySlug(contentDir: string, slug: string, locale: string = 'vi'): Post | null {
  try {
    let fullPath = '';

    // 1. Folder structure: slug/vi.mdx
    const folderPath = path.join(contentDir, slug, `${locale}.mdx`);
    if (fs.existsSync(folderPath)) {
      fullPath = folderPath;
    }

    // 2. Flat structure: slug.vi.mdx
    if (!fullPath) {
      const flatPath = path.join(contentDir, `${slug}.${locale}.mdx`);
      if (fs.existsSync(flatPath)) {
        fullPath = flatPath;
      }
    }

    // 3. Legacy: slug.mdx
    if (!fullPath) {
      const legacyPath = path.join(contentDir, `${slug}.mdx`);
      if (fs.existsSync(legacyPath)) {
        fullPath = legacyPath;
      }
    }

    if (!fullPath) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const title = data.title || data[`title_${locale}`] || slug;
    const excerpt = data.excerpt || data[`excerpt_${locale}`] || '';

    return {
      slug,
      title,
      date: data.date || new Date().toISOString(),
      excerpt,
      content,
      readingTime: readingTime(content).text,
      tags: data.tags || [],
      locale,
      thumbnail: data.thumbnail,
    };
  } catch {
    return null;
  }
}

/**
 * Get all content for a specific locale from a content directory
 */
function getAllContent(contentDir: string, locale: string = 'vi'): PostMeta[] {
  const slugs = getContentSlugs(contentDir);

  const posts = slugs
    .map((slug) => getContentBySlug(contentDir, slug, locale))
    .filter((post): post is Post => post !== null)
    .map(({ content: _content, ...meta }) => meta)
    .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));

  return posts;
}

// ── Blog exports ──

export function getPostSlugs(): string[] {
  return getContentSlugs(postsDirectory);
}

export function getPostBySlug(slug: string, locale: string = 'vi'): Post | null {
  return getContentBySlug(postsDirectory, slug, locale);
}

export function getAllPosts(locale: string = 'vi'): PostMeta[] {
  return getAllContent(postsDirectory, locale);
}

export function getPostsByTag(tag: string, locale: string = 'vi'): PostMeta[] {
  return getAllPosts(locale).filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getAllTags(locale: string = 'vi'): string[] {
  const posts = getAllPosts(locale);
  const tags = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags);
}

// ── Stories exports ──

export function getStorySlugs(): string[] {
  return getContentSlugs(storiesDirectory);
}

export function getStoryBySlug(slug: string, locale: string = 'vi'): Post | null {
  return getContentBySlug(storiesDirectory, slug, locale);
}

export function getAllStories(locale: string = 'vi'): PostMeta[] {
  return getAllContent(storiesDirectory, locale);
}

export function getStoriesByTag(tag: string, locale: string = 'vi'): PostMeta[] {
  return getAllStories(locale).filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getAllStoryTags(locale: string = 'vi'): string[] {
  const stories = getAllStories(locale);
  const tags = new Set<string>();

  stories.forEach((story) => {
    story.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags);
}
