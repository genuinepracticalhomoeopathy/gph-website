import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Define a proper type for contact submissions
interface ContactSubmission {
  id?: string;
  timestamp?: string;
  name: string;
  email: string;
  message: string;
  subject?: string;
  phone?: string;
  [key: string]: unknown; // Allow for additional form fields
}

const SUBMISSIONS_FILE = path.join(process.cwd(), 'data', 'contact-submissions.json');

async function ensureDirectoryExists() {
  const dir = path.dirname(SUBMISSIONS_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function readSubmissions(): Promise<ContactSubmission[]> {
  try {
    await ensureDirectoryExists();
    const data = await fs.readFile(SUBMISSIONS_FILE, 'utf8');
    return JSON.parse(data) as ContactSubmission[];
  } catch {
    // Removed unused 'error' parameter
    return [];
  }
}

async function writeSubmissions(submissions: ContactSubmission[]): Promise<void> {
  await ensureDirectoryExists();
  await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
}

export async function POST(request: Request) {
  try {
    const data = await request.json() as ContactSubmission;
    
    // Add timestamp to the submission
    const submission: ContactSubmission = {
      ...data,
      timestamp: new Date().toISOString(),
      id: Date.now().toString()
    };

    // Read existing submissions
    const submissions = await readSubmissions();
    
    // Add new submission
    submissions.push(submission);
    
    // Write back to file
    await writeSubmissions(submissions);
    
    return NextResponse.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}