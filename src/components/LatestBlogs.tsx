import React from 'react';
import Link from 'next/link';
import type { Locale } from '@/i18n/settings';

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  author: string;
  slug: string;
};

const featuredPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Getting Started with Web Development',
    excerpt: 'Learn the fundamentals of web development with this comprehensive guide.',
    date: '2023-10-15',
    image: '/images/blog/web-dev.jpg',
    author: 'John Doe',
    slug: 'getting-started-with-web-development',
  },
  {
    id: 2,
    title: 'The Power of Data Science',
    excerpt: 'Discover how data science is transforming industries and creating new opportunities.',
    date: '2023-09-28',
    image: '/images/blog/data-science.jpg',
    author: 'Jane Smith',
    slug: 'the-power-of-data-science',
  },
  {
    id: 3,
    title: 'Mastering UI/UX Design',
    excerpt: 'Tips and techniques to create user-friendly and visually appealing interfaces.',
    date: '2023-09-10',
    image: '/images/blog/ui-ux-design.jpg',
    author: 'Mike Johnson',
    slug: 'mastering-ui-ux-design',
  }
];

export default function LatestBlogs({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: any;
}) {
  // Add fallbacks for missing dictionary entries
  const blogDict = dictionary?.blog || {
    title: 'Our Blog',
    subtitle: 'Latest insights, news, and educational resources',
    imageAlt: 'Blog post image'
  };
  
  const commonDict = dictionary?.common || {
    readMore: 'Read More',
    viewAll: 'View All'
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {blogDict.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {blogDict.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <div key={post.id} className="bg-neutral rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600">{blogDict.imageAlt}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">
                  {post.date} • {post.author}
                </div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link 
                  href={`/${locale}/blog/${post.slug}`}
                  className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors duration-300"
                >
                  {commonDict.readMore}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href={`/${locale}/blog`}
            className="inline-block px-8 py-3 bg-secondary text-white rounded-full font-medium hover:bg-secondary-dark transition-colors"
          >
            {commonDict.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
} 