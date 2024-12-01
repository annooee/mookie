import { exec } from 'child_process';
import { promisify } from 'util';
import { NextResponse } from 'next/server';
import fs from 'fs/promises';

const execAsync = promisify(exec);

export async function GET() {
  try {
    // Execute Python script
    await execAsync('python backend/get_queue.py');
    
    // Read the generated JSON file
    const data = await fs.readFile('backend/next_in_queue.json', 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch queue' }, { status: 500 });
  }
} 