import { notFound } from 'next/navigation';
import { getStoryBySlug, getStorySlugs } from '@/lib/mdx';
import StoryPostClient from '@/components/stories/StoryPostClient';
import { locales } from '@/i18n/config';

interface Props {
  params: {
    locale: string;
    slug: string;
  };
}

// Generate static paths for all stories
export async function generateStaticParams() {
  const slugs = getStorySlugs();
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
  const post = getStoryBySlug(params.slug, params.locale);

  if (!post) {
    return {
      title: 'Story Not Found',
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

export default function StoryPostPage({ params }: Props) {
  const post = getStoryBySlug(params.slug, params.locale);

  if (!post) {
    notFound();
  }

  return (
    <StoryPostClient
      post={post}
      locale={params.locale}
      author="Phuoc Nguyen"
    />
  );
}
