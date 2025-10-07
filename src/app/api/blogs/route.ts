import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, orderBy, query } from 'firebase/firestore';

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

    const blog = await request.json() as Blog;

    // Create blog document with auto-generated ID
    const blogToSave: Blog = {
      ...blog,
      publishedAt: new Date().toISOString(),
      author: user.email
    };

    // Save to Firestore
    const docRef = await addDoc(collection(db, 'blogs'), blogToSave);

    return NextResponse.json({
      message: 'Blog post created successfully',
      blog: { ...blogToSave, id: docRef.id }
    });
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
    // Get all blogs from Firestore
    const blogsQuery = query(collection(db, 'blogs'), orderBy('publishedAt', 'desc'));
    const blogsSnapshot = await getDocs(blogsQuery);

    const blogs = blogsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    } as Blog));

    return NextResponse.json(blogs);
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

    const { id, ...blogData } = await request.json() as Blog & { id: string };

    if (!id) {
      return NextResponse.json(
        { error: 'Blog ID is required' },
        { status: 400 }
      );
    }

    // Update blog in Firestore
    const blogRef = doc(db, 'blogs', id);
    const updatedBlog = {
      ...blogData,
      updatedAt: new Date().toISOString()
    };

    await updateDoc(blogRef, updatedBlog);

    return NextResponse.json({
      message: 'Blog post updated successfully',
      blog: { ...updatedBlog, id }
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

    if (!id) {
      return NextResponse.json(
        { error: 'Blog ID is required' },
        { status: 400 }
      );
    }

    // Delete blog from Firestore
    const blogRef = doc(db, 'blogs', id);
    await deleteDoc(blogRef);

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