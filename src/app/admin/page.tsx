'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface BlogPost {
  title: string;
  content: string;
  image: string;
  tags: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [blogPost, setBlogPost] = useState<BlogPost>({
    title: '',
    content: '',
    image: '',
    tags: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated') === 'true';
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    document.cookie = 'adminAuthenticated=false; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    sessionStorage.removeItem('adminAuthenticated');
    router.push('/admin/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBlogPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const imageUrlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i;
    if (!imageUrlPattern.test(blogPost.image)) {
      setMessage('Please enter a direct image URL (ending with .jpg, .jpeg, .png, .webp, or .gif).');
      return;
    }

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...blogPost,
          tags: blogPost.tags.split(',').map(tag => tag.trim()),
          id: Date.now().toString(),
          publishedAt: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setMessage('Blog post created successfully!');
        setBlogPost({ title: '', content: '', image: '', tags: '' });
      } else {
        setMessage('Failed to create blog post');
      }
    } catch {
      setMessage('Error creating blog post');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6 text-black">Create New Blog Post</h2>
          {message && (
            <div className={`p-4 mb-6 rounded-md ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-black">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={blogPost.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-black"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-black">Content</label>
              <textarea
                id="content"
                name="content"
                required
                rows={6}
                value={blogPost.content}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-black"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-black">Image URL</label>
              <input
                type="url"
                id="image"
                name="image"
                required
                value={blogPost.image}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-black"
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-black">Tags (comma-separated)</label>
              <input
                type="text"
                id="tags"
                name="tags"
                required
                value={blogPost.tags}
                onChange={handleChange}
                placeholder="tag1, tag2, tag3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-black"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Create Blog Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}