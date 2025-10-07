'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  tags: string[];
  publishedAt: string;
  author?: string;
}

export default function BlogPage() {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const id = params.id as string;

  const renderContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/~~(.*?)~~/g, '<del class="line-through">$1</del>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-mono break-words">$1</code>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 mt-6 sm:mt-8 text-gray-900">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 mt-5 sm:mt-6 text-gray-900">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 mt-4 sm:mt-5 text-gray-900">$1</h3>')
      .replace(/^#### (.*$)/gm, '<h4 class="text-base sm:text-lg font-medium mb-2 mt-3 sm:mt-4 text-gray-900">$1</h4>')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-green-500 pl-3 sm:pl-6 py-2 my-3 sm:my-4 italic text-gray-700 bg-green-50 rounded-r-lg text-sm sm:text-base">$1</blockquote>')
      .replace(/^• (.*$)/gm, '<li class="ml-4 sm:ml-6 mb-2 list-disc text-sm sm:text-base">$1</li>')
      .replace(/^(\d+)\. (.*$)/gm, '<li class="ml-4 sm:ml-6 mb-2 list-decimal text-sm sm:text-base">$2</li>')
      .replace(/---/g, '<hr class="border-gray-300 my-6 sm:my-8">')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-green-600 hover:text-green-800 underline font-medium break-words" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\n/g, '<br>');
  };

  const fetchBlog = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/blogs');
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }

      const blogs = await response.json();
      const foundBlog = blogs.find((blog: BlogPost) => blog.id === id);

      if (!foundBlog) {
        throw new Error('Blog not found');
      }

      setBlog(foundBlog);
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch blog');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id, fetchBlog]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h1>
            <p className="text-gray-600 mb-6">
              {error || "The article you're looking for doesn't exist."}
            </p>
            <Link
              href="/blogs"
              className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to all articles</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Link
            href="/blogs"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors duration-200 font-medium text-sm sm:text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to all articles</span>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-12 mb-6 sm:mb-8 border border-gray-100">
            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 sm:px-4 py-1 sm:py-2 bg-green-50 text-green-700 text-xs sm:text-sm font-medium rounded-full border border-green-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-gray-600 pb-4 sm:pb-6 border-b border-gray-200 text-xs sm:text-sm md:text-base">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time dateTime={blog.publishedAt} className="font-medium">
                  {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              {blog.author && (
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium">By {blog.author.split('@')[0]}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{Math.ceil(blog.content.length / 200)} min read</span>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="prose prose-sm sm:prose-base lg:prose-lg prose-green max-w-none p-4 sm:p-6 md:p-8 lg:p-12">
              <div
                className="text-gray-800 leading-relaxed text-base sm:text-lg"
                dangerouslySetInnerHTML={{ __html: renderContent(blog.content) }}
              />
            </div>
          </div>

          {/* Article Footer */}
          <footer className="mt-6 sm:mt-8 md:mt-12 bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-gray-100">
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Share this article</h3>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  <button
                    onClick={() => {
                      const url = window.location.href;
                      const text = `Check out this article: ${blog.title}`;
                      const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
                      window.open(twitterUrl, '_blank');
                    }}
                    className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm sm:text-base min-w-[100px] sm:min-w-[120px]"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                    <span>Twitter</span>
                  </button>
                  <button
                    onClick={() => {
                      const url = window.location.href;
                      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                      window.open(facebookUrl, '_blank');
                    }}
                    className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm sm:text-base min-w-[100px] sm:min-w-[120px]"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Facebook</span>
                  </button>
                </div>
              </div>
              <Link
                href="/blogs"
                className="inline-flex items-center justify-center space-x-2 bg-green-600 text-white px-4 sm:px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium text-sm sm:text-base w-full sm:w-auto"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to all articles</span>
              </Link>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
}