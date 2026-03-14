import TerminalHero from '@/components/home/TerminalHero';
import BlogGrid from '@/components/home/BlogGrid';
import { getAllPosts } from '@/lib/mdx';

interface Props {
  params: {
    locale: string;
  };
}

export default function HomePage({ params }: Props) {
  const allPosts = getAllPosts(params.locale);
  const latestPosts = allPosts.slice(0, 6);

  return (
    <>
      <TerminalHero />
      <BlogGrid posts={latestPosts} />
    </>
  );
}
