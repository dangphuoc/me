import Hero from '@/components/home/Hero';
import TechStack from '@/components/home/TechStack';
import FeaturedPosts from '@/components/home/FeaturedPosts';
import { getAllPosts } from '@/lib/mdx';

interface Props {
  params: {
    locale: string;
  };
}

export default function HomePage({ params }: Props) {
  // Get latest 3 posts for featured section
  const allPosts = getAllPosts(params.locale);
  const featuredPosts = allPosts.slice(0, 3);

  return (
    <>
      <Hero />
      <FeaturedPosts posts={featuredPosts} />
      <TechStack />
    </>
  );
}
