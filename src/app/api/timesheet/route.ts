// File: app/api/timesheet/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, metadata, userId, ...timesheetData } = data;

    const entry = await prisma.timesheetEntry.create({
      data: {
        ...timesheetData,
        userId: userId || undefined,
        metadata: {
          name: metadata.name,
          description: metadata.description,
          status: metadata.status,
          statusUpdatedAt: new Date().toISOString(),
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    console.error('Error creating entry:', error);
    return NextResponse.json({ error: 'Failed to create entry' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const entries = await prisma.timesheetEntry.findMany({
      include: {
        user: true,
      },
    });

    const sanitizedEntries = entries.map(entry => ({
      ...entry,
      createdAt: entry.createdAt ? entry.createdAt.toISOString() : null,
      updatedAt: entry.updatedAt ? entry.updatedAt.toISOString() : null,
    }));

    return NextResponse.json(sanitizedEntries);
  } catch (error) {
    console.error('Error fetching entries:', error);
    return NextResponse.json({ error: 'Failed to fetch entries' }, { status: 500 });
  }
}