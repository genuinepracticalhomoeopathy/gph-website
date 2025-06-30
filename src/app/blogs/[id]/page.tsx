import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  tags: string[];
  publishedAt: string;
}

async function getBlogPost(id: string): Promise<BlogPost | null> {
  const filePath = path.join(process.cwd(), 'data', 'blogs.json');
  const data = await fs.readFile(filePath, 'utf8');
  const blogs = JSON.parse(data);
  return blogs.find((blog: BlogPost) => blog.id === id) || null;
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>; // Changed from { id: string } to Promise<{ id: string }>
}) {
  const { id } = await params; // Destructure id after awaiting params
  const blog = await getBlogPost(id);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h1>

            <time
              dateTime={blog.publishedAt}
              className="text-gray-600 mb-8 block"
            >
              {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>

            <div className="prose prose-lg max-w-none">{blog.content}</div>
          </div>
        </article>
      </main>
    </div>
  );
}