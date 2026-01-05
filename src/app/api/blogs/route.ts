import { NextRequest, NextResponse } from 'next/server';
import { db, blogs, type NewBlog } from '@/lib/db';
import { desc, eq } from 'drizzle-orm';

// Define a proper type for blog objects from the frontend
interface BlogRequest {
  title: string;
  content: string;
  excerpt?: string;
  tags?: string | string[];
}

// Middleware to verify admin authentication
function verifyAdminAuth(request: NextRequest) {
  const isAuthenticated = request.cookies.get('admin-authenticated')?.value === 'true';
  const email = request.cookies.get('admin-email')?.value;

  if (!isAuthenticated || !email) {
    return null;
  }

  return { email, role: 'admin' };
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const user = verifyAdminAuth(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const blogData = await request.json() as BlogRequest;

    // Validate required fields
    if (!blogData.title || !blogData.content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Prepare blog data for database
    const tagsString = Array.isArray(blogData.tags) 
      ? JSON.stringify(blogData.tags)
      : typeof blogData.tags === 'string'
      ? JSON.stringify(blogData.tags.split(',').map(tag => tag.trim()).filter(Boolean))
      : null;

    const newBlog: NewBlog = {
      title: blogData.title,
      content: blogData.content,
      excerpt: blogData.excerpt || null,
      author: user.email,
      tags: tagsString,
    };

    // Insert into database
    const result = await db.insert(blogs).values(newBlog).returning();
    const createdBlog = result[0];

    return NextResponse.json({
      message: 'Blog post created successfully',
      blog: {
        ...createdBlog,
        tags: createdBlog.tags ? JSON.parse(createdBlog.tags) : []
      }
    });
  } catch (error) {
    console.error('Blog creation error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('database') || error.message.includes('connection')) {
        return NextResponse.json(
          { error: 'Database connection error. Please check your DATABASE_URL configuration.' },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to create blog post. Check console for details.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get all blogs from database, ordered by publishedAt desc
    const allBlogs = await db
      .select()
      .from(blogs)
      .orderBy(desc(blogs.publishedAt));

    // Parse tags back to arrays
    const blogsWithParsedTags = allBlogs.map(blog => ({
      ...blog,
      tags: blog.tags ? JSON.parse(blog.tags) : []
    }));

    return NextResponse.json(blogsWithParsedTags);
  } catch (error) {
    console.error('Error reading blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Verify admin authentication
    const user = verifyAdminAuth(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id, ...blogData } = await request.json() as BlogRequest & { id: string };

    if (!id || !Number.isInteger(Number(id))) {
      return NextResponse.json(
        { error: 'Valid blog ID is required' },
        { status: 400 }
      );
    }

    // Prepare updated blog data
    const tagsString = Array.isArray(blogData.tags) 
      ? JSON.stringify(blogData.tags)
      : typeof blogData.tags === 'string'
      ? JSON.stringify(blogData.tags.split(',').map(tag => tag.trim()).filter(Boolean))
      : null;

    const updatedData = {
      title: blogData.title,
      content: blogData.content,
      excerpt: blogData.excerpt || null,
      tags: tagsString,
      updatedAt: new Date(),
    };

    // Update blog in database
    const result = await db
      .update(blogs)
      .set(updatedData)
      .where(eq(blogs.id, Number(id)))
      .returning();

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    const updatedBlog = result[0];

    return NextResponse.json({
      message: 'Blog post updated successfully',
      blog: {
        ...updatedBlog,
        tags: updatedBlog.tags ? JSON.parse(updatedBlog.tags) : []
      }
    });
  } catch (error) {
    console.error('Blog update error:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Verify admin authentication
    const user = verifyAdminAuth(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || !Number.isInteger(Number(id))) {
      return NextResponse.json(
        { error: 'Valid blog ID is required' },
        { status: 400 }
      );
    }

    // Delete blog from database
    const result = await db
      .delete(blogs)
      .where(eq(blogs.id, Number(id)))
      .returning();

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Blog deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}