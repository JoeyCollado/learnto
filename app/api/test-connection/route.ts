import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await connectToDatabase();
    return NextResponse.json({
      status: 'success',
      message: 'MongoDB connection successful',
      connection: db.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'MongoDB connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 