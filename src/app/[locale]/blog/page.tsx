import { getAllPosts } from '@/lib/mdx';
import BlogListClient from '@/components/blog/BlogListClient';

interface Props {
  params: {
    locale: string;
  };
}

export default function BlogPage({ params }: Props) {
  const posts = getAllPosts(params.locale);

  return <BlogListClient posts={posts} locale={params.locale} />;
}
