import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const SUBMISSIONS_FILE = path.join(process.cwd(), 'data', 'contact-submissions.json');

async function ensureDirectoryExists() {
  const dir = path.dirname(SUBMISSIONS_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function readSubmissions() {
  try {
    await ensureDirectoryExists();
    const data = await fs.readFile(SUBMISSIONS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeSubmissions(submissions: any[]) {
  await ensureDirectoryExists();
  await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Add timestamp to the submission
    const submission = {
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