import { notFound } from 'next/navigation';
import { getPostBySlug, getPostSlugs } from '@/lib/mdx';
import BlogPostClient from '@/components/blog/BlogPostClient';
import { locales } from '@/i18n/config';

interface Props {
  params: {
    locale: string;
    slug: string;
  };
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const slugs = getPostSlugs();
  const paths: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const slug of slugs) {
      paths.push({ locale, slug });
    }
  }

  return paths;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props) {
  const post = getPostBySlug(params.slug, params.locale);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['Phuoc Nguyen'],
      images: post.thumbnail ? [post.thumbnail] : [],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug, params.locale);

  if (!post) {
    notFound();
  }

  return (
    <BlogPostClient
      post={post}
      locale={params.locale}
      author="Phuoc Nguyen"
    />
  );
}
