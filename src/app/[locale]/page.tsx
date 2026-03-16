import TerminalHero from '@/components/home/TerminalHero';
import BlogGrid from '@/components/home/BlogGrid';
import { getAllPosts, getAllStories } from '@/lib/mdx';

interface Props {
  params: {
    locale: string;
  };
}

export default function HomePage({ params }: Props) {
  const allPosts = getAllPosts(params.locale);
  const latestPosts = allPosts.slice(0, 6);

  const allStories = getAllStories(params.locale);
  const latestStories = allStories.slice(0, 3);

  return (
    <>
      <TerminalHero />
      <BlogGrid posts={latestPosts} />
      {latestStories.length > 0 && (
        <BlogGrid posts={latestStories} basePath="stories" />
      )}
    </>
  );
}
