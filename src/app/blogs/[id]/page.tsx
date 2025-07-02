import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Head from 'next/head';

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
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await getBlogPost(id);

  if (!blog) {
    notFound();
  }

  const description = blog.content.replace(/<[^>]+>/g, '').slice(0, 150);
  const url = `https://your-domain.com/blogs/${blog.id}`;

  return (
    <>
      <Head>
        <title>{blog.title} | Genuine Practical Homoeopathy</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={description} />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-12">
          <article className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden text-black">
            <div className="p-8">
              <h1 className="text-4xl font-bold text-black mb-4">
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
              <div className="prose prose-lg max-w-none text-black">{blog.content}</div>
              <div className="flex flex-wrap gap-2 mt-8">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </main>
      </div>
    </>
  );
}