import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Define a proper type for blog objects
interface Blog {
  id?: string;
  publishedAt?: string;
  title: string;
  content: string;
  author?: string;
  tags?: string[];
  excerpt?: string;
  [key: string]: unknown; // Allow for additional properties
}

const BLOGS_FILE = path.join(process.cwd(), 'data', 'blogs.json');

async function ensureDirectoryExists() {
  const dir = path.dirname(BLOGS_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function readBlogs(): Promise<Blog[]> {
  try {
    await ensureDirectoryExists();
    const data = await fs.readFile(BLOGS_FILE, 'utf8');
    return JSON.parse(data) as Blog[];
  } catch {
    // Removed unused 'error' parameter
    return [];
  }
}

async function writeBlogs(blogs: Blog[]): Promise<void> {
  await ensureDirectoryExists();
  await fs.writeFile(BLOGS_FILE, JSON.stringify(blogs, null, 2));
}

export async function POST(request: Request) {
  try {
    const blog = await request.json() as Blog;

    // Add id and published date
    const blogToSave: Blog = {
      ...blog,
      id: Date.now().toString(),
      publishedAt: new Date().toISOString()
    };

    // Read existing blogs
    const blogs = await readBlogs();

    // Add new blog
    blogs.push(blogToSave);

    // Write back to file
    await writeBlogs(blogs);

    return NextResponse.json({ message: 'Blog post created successfully', blog: blogToSave });
  } catch (error) {
    console.error('Blog creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const blogs = await readBlogs();
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error reading blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}