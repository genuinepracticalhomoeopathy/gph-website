'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface BlogPost {
  id?: string;
  title: string;
  content: string;
  tags: string | string[];
  publishedAt?: string;
  author?: string;
}

interface User {
  email: string;
  role: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [blogPost, setBlogPost] = useState<BlogPost>({
    title: '',
    content: '',
    tags: ''
  });
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    checkAuth();
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/verify');
      if (response.ok) {
        const data = await response.json();
        if (data.authenticated) {
          setUser(data.user);
        } else {
          router.push('/admin/login');
        }
      } else {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/admin/login');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await fetch('/api/blogs');
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      router.push('/admin/login');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBlogPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const insertFormattingAtCursor = (before: string, after: string = '') => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const beforeText = textarea.value.substring(0, start);
    const afterText = textarea.value.substring(end);

    const newText = beforeText + before + selectedText + after + afterText;

    setBlogPost(prev => ({
      ...prev,
      content: newText
    }));

    // Set cursor position after formatting
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length + after.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const formatText = (type: string) => {
    switch (type) {
      case 'bold':
        insertFormattingAtCursor('**', '**');
        break;
      case 'italic':
        insertFormattingAtCursor('*', '*');
        break;
      case 'underline':
        insertFormattingAtCursor('<u>', '</u>');
        break;
      case 'strikethrough':
        insertFormattingAtCursor('~~', '~~');
        break;
      case 'h1':
        insertFormattingAtCursor('\n# ', '\n');
        break;
      case 'h2':
        insertFormattingAtCursor('\n## ', '\n');
        break;
      case 'h3':
        insertFormattingAtCursor('\n### ', '\n');
        break;
      case 'h4':
        insertFormattingAtCursor('\n#### ', '\n');
        break;
      case 'quote':
        insertFormattingAtCursor('\n> ', '\n');
        break;
      case 'code':
        insertFormattingAtCursor('`', '`');
        break;
      case 'codeblock':
        insertFormattingAtCursor('\n```\n', '\n```\n');
        break;
      case 'link':
        insertFormattingAtCursor('[', '](https://)');
        break;
      case 'unordered-list':
        insertFormattingAtCursor('\n• ', '\n');
        break;
      case 'ordered-list':
        insertFormattingAtCursor('\n1. ', '\n');
        break;
      case 'line':
        insertFormattingAtCursor('\n---\n', '');
        break;
    }
  };

  const renderPreview = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/~~(.*?)~~/g, '<del>$1</del>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold mb-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold mb-2">$1</h3>')
      .replace(/^#### (.*$)/gm, '<h4 class="text-lg font-medium mb-2">$1</h4>')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-700 my-2">$1</blockquote>')
      .replace(/^• (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/^(\d+)\. (.*$)/gm, '<li class="ml-4 list-decimal">$1. $2</li>')
      .replace(/---/g, '<hr class="border-gray-300 my-4">')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 underline" target="_blank">$1</a>')
      .replace(/\n/g, '<br>');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const method = editingBlog ? 'PUT' : 'POST';
      const tagsArray = typeof blogPost.tags === 'string'
        ? blogPost.tags.split(',').map((tag: string) => tag.trim())
        : blogPost.tags;

      const payload = editingBlog
        ? { ...blogPost, id: editingBlog.id, tags: tagsArray }
        : { ...blogPost, tags: tagsArray };

      const response = await fetch('/api/blogs', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage(editingBlog ? 'Blog post updated successfully!' : 'Blog post created successfully!');
        setBlogPost({ title: '', content: '', tags: '' });
        setEditingBlog(null);
        setPreviewMode(false);
        fetchBlogs();
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'Failed to save blog post');
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
      setMessage('Error saving blog post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setBlogPost({
      title: blog.title,
      content: blog.content,
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags
    });
    setMessage('');
    setPreviewMode(false);
  };

  const handleCancelEdit = () => {
    setEditingBlog(null);
    setBlogPost({ title: '', content: '', tags: '' });
    setMessage('');
    setPreviewMode(false);
  };

  const handleDelete = async (blogId: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const response = await fetch(`/api/blogs?id=${blogId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Blog post deleted successfully!');
        fetchBlogs();
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'Failed to delete blog post');
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
      setMessage('Error deleting blog post');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border-3 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-700 text-lg font-medium">Loading Admin Dashboard...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 w-10 h-10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Blog Admin Dashboard
                </h1>
                {user && (
                  <p className="text-gray-600 text-sm">Welcome back, {user.email.split('@')[0]}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/blogs"
                target="_blank"
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>View Blog</span>
              </a>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success/Error Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl border-l-4 ${message.includes('success')
            ? 'bg-green-50 border-green-500 text-green-700'
            : 'bg-red-50 border-red-500 text-red-700'
            }`}>
            <div className="flex items-center">
              {message.includes('success') ? (
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {message}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Blog Editor */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Title Input */}
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                    Blog Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={blogPost.title}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="Enter your blog post title..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500 disabled:opacity-50 disabled:bg-gray-50"
                  />
                </div>

                {/* Content Editor */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="content" className="block text-sm font-semibold text-gray-700">
                      Content
                    </label>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setPreviewMode(!previewMode)}
                        className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${previewMode
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                      >
                        {previewMode ? 'Edit' : 'Preview'}
                      </button>
                    </div>
                  </div>

                  {/* Formatting Toolbar */}
                  {!previewMode && (
                    <div className="bg-gray-50 border border-gray-200 rounded-t-xl p-3">
                      <div className="flex flex-wrap gap-1">
                        {/* Text Formatting */}
                        <div className="flex border-r border-gray-300 pr-2 mr-2">
                          <button type="button" onClick={() => formatText('bold')} className="p-2 hover:bg-gray-200 rounded text-gray-700 font-bold" title="Bold">B</button>
                          <button type="button" onClick={() => formatText('italic')} className="p-2 hover:bg-gray-200 rounded text-gray-700 italic" title="Italic">I</button>
                          <button type="button" onClick={() => formatText('underline')} className="p-2 hover:bg-gray-200 rounded text-gray-700 underline" title="Underline">U</button>
                          <button type="button" onClick={() => formatText('strikethrough')} className="p-2 hover:bg-gray-200 rounded text-gray-700 line-through" title="Strikethrough">S</button>
                        </div>

                        {/* Headings */}
                        <div className="flex border-r border-gray-300 pr-2 mr-2">
                          <button type="button" onClick={() => formatText('h1')} className="p-2 hover:bg-gray-200 rounded text-gray-700 text-lg font-bold" title="Heading 1">H1</button>
                          <button type="button" onClick={() => formatText('h2')} className="p-2 hover:bg-gray-200 rounded text-gray-700 text-base font-semibold" title="Heading 2">H2</button>
                          <button type="button" onClick={() => formatText('h3')} className="p-2 hover:bg-gray-200 rounded text-gray-700 text-sm font-medium" title="Heading 3">H3</button>
                          <button type="button" onClick={() => formatText('h4')} className="p-2 hover:bg-gray-200 rounded text-gray-700 text-xs font-medium" title="Heading 4">H4</button>
                        </div>

                        {/* Lists and Elements */}
                        <div className="flex border-r border-gray-300 pr-2 mr-2">
                          <button type="button" onClick={() => formatText('unordered-list')} className="p-2 hover:bg-gray-200 rounded text-gray-700" title="Bullet List">•</button>
                          <button type="button" onClick={() => formatText('ordered-list')} className="p-2 hover:bg-gray-200 rounded text-gray-700" title="Numbered List">1.</button>
                          <button type="button" onClick={() => formatText('quote')} className="p-2 hover:bg-gray-200 rounded text-gray-700" title="Quote">&quot;</button>
                          <button type="button" onClick={() => formatText('line')} className="p-2 hover:bg-gray-200 rounded text-gray-700" title="Horizontal Line">—</button>
                        </div>

                        {/* Code and Links */}
                        <div className="flex">
                          <button type="button" onClick={() => formatText('code')} className="p-2 hover:bg-gray-200 rounded text-gray-700 font-mono" title="Inline Code">&lt;/&gt;</button>
                          <button type="button" onClick={() => formatText('codeblock')} className="p-2 hover:bg-gray-200 rounded text-gray-700" title="Code Block">{ }</button>
                          <button type="button" onClick={() => formatText('link')} className="p-2 hover:bg-gray-200 rounded text-gray-700" title="Link">🔗</button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Content Area */}
                  {previewMode ? (
                    <div
                      className="w-full min-h-[300px] p-4 border border-gray-300 rounded-b-xl bg-white prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: renderPreview(blogPost.content) }}
                    />
                  ) : (
                    <textarea
                      ref={contentRef}
                      id="content"
                      name="content"
                      required
                      rows={12}
                      value={blogPost.content}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      placeholder="Write your blog content here... Use the toolbar above for formatting!"
                      className="w-full px-4 py-3 border border-gray-300 rounded-b-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500 disabled:opacity-50 disabled:bg-gray-50 font-mono text-sm"
                    />
                  )}
                </div>

                {/* Tags Input */}
                <div>
                  <label htmlFor="tags" className="block text-sm font-semibold text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    required
                    value={blogPost.tags}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="homeopathy, health, medicine, treatment (comma-separated)"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500 disabled:opacity-50 disabled:bg-gray-50"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        {editingBlog ? 'Updating...' : 'Publishing...'}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        {editingBlog ? 'Update Blog Post' : 'Publish Blog Post'}
                      </div>
                    )}
                  </button>
                  {editingBlog && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Blog List Sidebar */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Published Posts ({blogs.length})
                </h2>
              </div>

              <div className="p-6">
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {blogs.length === 0 ? (
                    <div className="text-center py-12">
                      <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-gray-500 font-medium">No blog posts yet</p>
                      <p className="text-gray-400 text-sm">Create your first blog post to get started!</p>
                    </div>
                  ) : (
                    blogs.map((blog) => (
                      <div key={blog.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">{blog.title}</h3>
                        <p className="text-gray-600 text-xs mb-3 line-clamp-3">{blog.content.substring(0, 100)}...</p>

                        {/* Tags */}
                        {blog.tags && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {(() => {
                              const tagsArray = Array.isArray(blog.tags) ? blog.tags : blog.tags.split(',');
                              return tagsArray.slice(0, 3).map((tag: string, index: number) => (
                                <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                                  {tag.trim()}
                                </span>
                              ));
                            })()}
                            {(() => {
                              const tagsArray = Array.isArray(blog.tags) ? blog.tags : blog.tags.split(',');
                              return tagsArray.length > 3 && (
                                <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-full">
                                  +{tagsArray.length - 3}
                                </span>
                              );
                            })()}
                          </div>
                        )}

                        <div className="flex justify-between items-center">
                          <div className="text-xs text-gray-500">
                            {blog.publishedAt && new Date(blog.publishedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(blog)}
                              className="px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center space-x-1"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDelete(blog.id!)}
                              className="px-3 py-1 text-xs bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors flex items-center space-x-1"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Posts</span>
                  <span className="font-semibold text-green-600">{blogs.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Published Today</span>
                  <span className="font-semibold text-blue-600">
                    {blogs.filter(blog =>
                      blog.publishedAt &&
                      new Date(blog.publishedAt).toDateString() === new Date().toDateString()
                    ).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-semibold text-purple-600">
                    {blogs.filter(blog =>
                      blog.publishedAt &&
                      new Date(blog.publishedAt).getMonth() === new Date().getMonth() &&
                      new Date(blog.publishedAt).getFullYear() === new Date().getFullYear()
                    ).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}