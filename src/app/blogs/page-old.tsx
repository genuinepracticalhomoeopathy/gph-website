'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  tags: string[];
  publishedAt: string;
  author?: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch('/api/blogs', {
          cache: 'no-store'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);
  if (loading) {
    return (
      <div className=\"min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center\">
        <div className=\"text-center\">
          <div className=\"w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4\"></div>
          <p className=\"text-gray-600\">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className=\"min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center\">
        <div className=\"text-center\">
          <div className=\"bg-red-50 border border-red-200 rounded-lg p-6 max-w-md\">
            <h3 className=\"text-red-800 font-semibold mb-2\">Error Loading Blogs</h3>
            <p className=\"text-red-600\">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className=\"mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700\"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-green-600">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Discover insights, tips, and knowledge about homoeopathy, health, and wellness
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-xl shadow-lg p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Blog Posts Yet</h3>
              <p className="text-gray-600">Check back soon for new articles and insights!</p>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <p className="text-gray-600">
                <span className="font-semibold text-green-600">{blogs.length}</span> article{blogs.length !== 1 ? 's' : ''} published
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {blogs.map((blog, index) => (
                <article
                  key={blog.id}
                  className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200 hover:-translate-y-1 ${
                    index === 0 ? 'md:col-span-2 xl:col-span-1' : ''
                  }`}
                >
                  <div className="p-8">
                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {blog.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full border border-green-100"
                          >
                            {tag}
                          </span>
                        ))}
                        {blog.tags.length > 3 && (
                          <span className="px-3 py-1 bg-gray-50 text-gray-500 text-sm rounded-full">
                            +{blog.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-200 leading-tight">
                      <Link href={`/blogs/${blog.id}`} className="block">
                        {blog.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                      {blog.content.replace(/<[^>]*>/g, '').substring(0, 180)}...
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <time dateTime={blog.publishedAt} className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>
                            {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </time>
                        {blog.author && (
                          <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>{blog.author.split('@')[0]}</span>
                          </div>
                        )}
                      </div>
                      <Link
                        href={`/blogs/${blog.id}`}
                        className="inline-flex items-center space-x-1 text-green-600 hover:text-green-700 font-medium text-sm group-hover:translate-x-1 transition-transform duration-200"
                      >
                        <span>Read more</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}