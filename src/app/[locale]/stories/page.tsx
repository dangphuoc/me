import { getAllStories } from '@/lib/mdx';
import StoryListClient from '@/components/stories/StoryListClient';

interface Props {
  params: {
    locale: string;
  };
}

export default function StoriesPage({ params }: Props) {
  const stories = getAllStories(params.locale);

  return <StoryListClient posts={stories} locale={params.locale} />;
}
