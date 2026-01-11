'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import {
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Filter,
  ChevronDown,
} from 'lucide-react';
import Image from 'next/image';

// Beautiful sample moments with tags
const sampleMoments = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    caption: {
      vi: 'Bình minh trên đỉnh Fansipan - Nóc nhà Đông Dương',
      en: 'Sunrise at Fansipan Peak - The Roof of Indochina',
    },
    date: '2024-01-15',
    location: 'Sapa, Vietnam',
    tags: ['travel', 'nature'],
    likes: 342,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
    caption: {
      vi: 'Brainstorming session với team - Những ý tưởng tuyệt vời',
      en: 'Brainstorming session with the team - Great ideas flowing',
    },
    date: '2024-01-10',
    location: 'Ho Chi Minh City',
    tags: ['work', 'team'],
    likes: 128,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
    caption: {
      vi: 'Hoàng hôn tại vịnh Hạ Long - Di sản thiên nhiên thế giới',
      en: 'Sunset at Ha Long Bay - World Natural Heritage',
    },
    date: '2024-01-05',
    location: 'Ha Long, Vietnam',
    tags: ['travel', 'nature'],
    likes: 489,
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    caption: {
      vi: 'Góc làm việc mới - Minimalist & Productive',
      en: 'New workspace corner - Minimalist & Productive',
    },
    date: '2024-01-01',
    location: 'Home Office',
    tags: ['work', 'lifestyle'],
    likes: 156,
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
    caption: {
      vi: 'Phở Hà Nội buổi sáng - Hương vị quê hương',
      en: 'Morning Pho in Hanoi - Taste of homeland',
    },
    date: '2023-12-28',
    location: 'Hanoi, Vietnam',
    tags: ['food', 'lifestyle'],
    likes: 267,
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    caption: {
      vi: 'Tokyo về đêm - Thành phố không ngủ',
      en: 'Tokyo at night - The city that never sleeps',
    },
    date: '2023-12-25',
    location: 'Tokyo, Japan',
    tags: ['travel', 'lifestyle'],
    likes: 521,
  },
  {
    id: '7',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    caption: {
      vi: 'Late night coding - Building something awesome',
      en: 'Late night coding - Building something awesome',
    },
    date: '2023-12-20',
    location: 'Ho Chi Minh City',
    tags: ['work', 'tech'],
    likes: 189,
  },
  {
    id: '8',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800',
    caption: {
      vi: 'Đêm đầy sao tại Đà Lạt - Thiên đường nghỉ dưỡng',
      en: 'Starry night in Da Lat - Paradise retreat',
    },
    date: '2023-12-15',
    location: 'Da Lat, Vietnam',
    tags: ['travel', 'nature'],
    likes: 634,
  },
  {
    id: '9',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
    caption: {
      vi: 'Tech Talk tại Google Developer Summit',
      en: 'Tech Talk at Google Developer Summit',
    },
    date: '2023-11-20',
    location: 'Singapore',
    tags: ['work', 'tech'],
    likes: 312,
  },
  {
    id: '10',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
    caption: {
      vi: 'Chùa vàng Kyoto - Vẻ đẹp cổ kính',
      en: 'Golden Temple Kyoto - Ancient beauty',
    },
    date: '2023-11-10',
    location: 'Kyoto, Japan',
    tags: ['travel', 'culture'],
    likes: 445,
  },
  {
    id: '11',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    caption: {
      vi: 'Fine dining experience - Michelin star restaurant',
      en: 'Fine dining experience - Michelin star restaurant',
    },
    date: '2023-10-25',
    location: 'Bangkok, Thailand',
    tags: ['food', 'lifestyle'],
    likes: 278,
  },
  {
    id: '12',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    caption: {
      vi: 'Team retreat 2023 - Kỷ niệm đáng nhớ',
      en: 'Team retreat 2023 - Memorable moments',
    },
    date: '2023-10-15',
    location: 'Phu Quoc, Vietnam',
    tags: ['work', 'team'],
    likes: 356,
  },
];

type SortOption = 'newest' | 'oldest' | 'popular';

export default function MomentsPage() {
  const t = useTranslations('moments');
  const pathname = usePathname();
  const locale = (pathname.split('/')[1] || 'vi') as 'vi' | 'en';

  const [selectedMoment, setSelectedMoment] = useState<string | null>(null);
  const [likedMoments, setLikedMoments] = useState<Set<string>>(new Set());
  const [moments, setMoments] = useState(sampleMoments);

  // Filter states
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Get unique years and tags
  const years = useMemo(() => {
    const uniqueYears = [...new Set(sampleMoments.map(m => new Date(m.date).getFullYear()))];
    return uniqueYears.sort((a, b) => b - a);
  }, []);

  const allTags = useMemo(() => {
    return [...new Set(sampleMoments.flatMap(m => m.tags))];
  }, []);

  const tagLabels: Record<string, { vi: string; en: string }> = {
    travel: { vi: 'Du lịch', en: 'Travel' },
    work: { vi: 'Công việc', en: 'Work' },
    food: { vi: 'Ẩm thực', en: 'Food' },
    nature: { vi: 'Thiên nhiên', en: 'Nature' },
    lifestyle: { vi: 'Lifestyle', en: 'Lifestyle' },
    tech: { vi: 'Công nghệ', en: 'Tech' },
    team: { vi: 'Team', en: 'Team' },
    culture: { vi: 'Văn hóa', en: 'Culture' },
  };

  const sortLabels: Record<SortOption, { vi: string; en: string }> = {
    newest: { vi: 'Mới nhất', en: 'Newest' },
    oldest: { vi: 'Cũ nhất', en: 'Oldest' },
    popular: { vi: 'Phổ biến', en: 'Popular' },
  };

  // Filter and sort moments
  const filteredMoments = useMemo(() => {
    let result = [...moments];

    if (selectedYear) {
      result = result.filter(m => new Date(m.date).getFullYear() === selectedYear);
    }

    if (selectedTag) {
      result = result.filter(m => m.tags.includes(selectedTag));
    }

    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'popular':
        result.sort((a, b) => b.likes - a.likes);
        break;
    }

    return result;
  }, [moments, selectedYear, selectedTag, sortBy]);

  useEffect(() => {
    const saved = localStorage.getItem('likedMoments');
    if (saved) {
      setLikedMoments(new Set(JSON.parse(saved)));
    }
  }, []);

  const handleLike = (id: string) => {
    const newLiked = new Set(likedMoments);
    if (newLiked.has(id)) {
      newLiked.delete(id);
      setMoments((prev) =>
        prev.map((m) => (m.id === id ? { ...m, likes: m.likes - 1 } : m))
      );
    } else {
      newLiked.add(id);
      setMoments((prev) =>
        prev.map((m) => (m.id === id ? { ...m, likes: m.likes + 1 } : m))
      );
    }
    setLikedMoments(newLiked);
    localStorage.setItem('likedMoments', JSON.stringify(Array.from(newLiked)));
  };

  const hasActiveFilters = selectedYear || selectedTag;

  const currentMoment = filteredMoments.find((m) => m.id === selectedMoment);
  const currentIndex = filteredMoments.findIndex((m) => m.id === selectedMoment);

  const goToPrev = () => {
    if (currentIndex > 0) {
      setSelectedMoment(filteredMoments[currentIndex - 1].id);
    }
  };

  const goToNext = () => {
    if (currentIndex < filteredMoments.length - 1) {
      setSelectedMoment(filteredMoments[currentIndex + 1].id);
    }
  };

  return (
    <div className="min-h-screen gradient-bg py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Filter Bar - Clean & Minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
            {/* Left: Year Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
              <button
                onClick={() => setSelectedYear(null)}
                className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                  !selectedYear
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {locale === 'vi' ? 'Tất cả' : 'All'}
              </button>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(selectedYear === year ? null : year)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                    selectedYear === year
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>

            {/* Right: Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
              >
                <Filter size={16} />
                {sortLabels[sortBy][locale]}
                <ChevronDown size={16} className={`transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showSortDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden z-20"
                  >
                    {(['newest', 'oldest', 'popular'] as SortOption[]).map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortBy(option);
                          setShowSortDropdown(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                          sortBy === option
                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                        }`}
                      >
                        {sortLabels[option][locale]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Tags - Subtle Pills */}
          <div className="flex items-center gap-2 pt-4 overflow-x-auto pb-2">
            <span className="text-sm text-gray-500 dark:text-gray-500 mr-2 whitespace-nowrap">
              {locale === 'vi' ? 'Chủ đề:' : 'Topics:'}
            </span>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-all ${
                  selectedTag === tag
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tagLabels[tag]?.[locale] || tag}
              </button>
            ))}
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSelectedYear(null);
                  setSelectedTag(null);
                }}
                className="px-3 py-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors whitespace-nowrap"
              >
                {locale === 'vi' ? 'Xóa lọc' : 'Clear'}
              </button>
            )}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-sm text-gray-500 dark:text-gray-500"
        >
          {filteredMoments.length} {locale === 'vi' ? 'khoảnh khắc' : 'moments'}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredMoments.map((moment, index) => (
              <motion.div
                key={moment.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                whileHover={{ scale: 1.02 }}
                className="relative aspect-square group cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                onClick={() => setSelectedMoment(moment.id)}
              >
                <Image
                  src={moment.image}
                  alt={moment.caption[locale]}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-2 text-white">
                    <Heart
                      size={18}
                      className={likedMoments.has(moment.id) ? 'fill-white' : ''}
                    />
                    <span className="text-sm font-medium">{moment.likes}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredMoments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 dark:text-gray-400">
              {locale === 'vi'
                ? 'Không tìm thấy khoảnh khắc nào'
                : 'No moments found'}
            </p>
            <button
              onClick={() => {
                setSelectedYear(null);
                setSelectedTag(null);
              }}
              className="mt-4 text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              {locale === 'vi' ? 'Xóa bộ lọc' : 'Clear filters'}
            </button>
          </motion.div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedMoment && currentMoment && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
              onClick={() => setSelectedMoment(null)}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedMoment(null)}
                className="absolute top-6 right-6 p-2 text-white/60 hover:text-white transition-colors"
              >
                <X size={28} />
              </button>

              {/* Navigation */}
              {currentIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrev();
                  }}
                  className="absolute left-4 p-3 text-white/60 hover:text-white transition-colors"
                >
                  <ChevronLeft size={36} />
                </button>
              )}
              {currentIndex < filteredMoments.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-4 p-3 text-white/60 hover:text-white transition-colors"
                >
                  <ChevronRight size={36} />
                </button>
              )}

              {/* Counter */}
              <div className="absolute top-6 left-6 text-white/60 text-sm font-medium">
                {currentIndex + 1} / {filteredMoments.length}
              </div>

              {/* Content */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-5xl"
              >
                <div className="grid md:grid-cols-5 gap-6">
                  {/* Image - 3 cols */}
                  <div className="md:col-span-3 relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image
                      src={currentMoment.image}
                      alt={currentMoment.caption[locale]}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                  </div>

                  {/* Info - 2 cols */}
                  <div className="md:col-span-2 flex flex-col justify-center text-white">
                    <p className="text-lg md:text-xl leading-relaxed mb-6">
                      {currentMoment.caption[locale]}
                    </p>

                    <div className="space-y-3 text-white/60 text-sm">
                      <p className="flex items-center gap-3">
                        <Calendar size={16} />
                        {new Date(currentMoment.date).toLocaleDateString(
                          locale === 'vi' ? 'vi-VN' : 'en-US',
                          { year: 'numeric', month: 'long', day: 'numeric' }
                        )}
                      </p>
                      <p className="flex items-center gap-3">
                        <MapPin size={16} />
                        {currentMoment.location}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-2 mt-6">
                      {currentMoment.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80"
                        >
                          {tagLabels[tag]?.[locale] || tag}
                        </span>
                      ))}
                    </div>

                    {/* Like */}
                    <button
                      onClick={() => handleLike(currentMoment.id)}
                      className="flex items-center gap-3 mt-8 group"
                    >
                      <motion.div whileTap={{ scale: 1.2 }}>
                        <Heart
                          size={24}
                          className={`transition-colors ${
                            likedMoments.has(currentMoment.id)
                              ? 'fill-red-500 text-red-500'
                              : 'text-white/60 group-hover:text-red-400'
                          }`}
                        />
                      </motion.div>
                      <span className="text-white/60 font-medium">
                        {currentMoment.likes}
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
