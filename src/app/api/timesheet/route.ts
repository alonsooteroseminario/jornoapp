import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // Remove the 'id' field from the incoming data
    const { id, metadata, userId, ...timesheetData } = data;
    const currentDate = new Date().toISOString();

    const entry = await prisma.timesheetEntry.create({
      data: {
        ...timesheetData,
        id: id,
        userId: userId,
        metadata: {
          name: metadata?.name || '',
          description: metadata?.description || '',
          createdAt: currentDate,
          updatedAt: currentDate,
          status: metadata?.status || 'Draft',
          statusUpdatedAt: currentDate,
        },
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
      // where: {
      //   userId: { not: null } // Only fetch entries with non-null userId
      // }
    });

    // Ensure all metadata fields are present, even if null
    const sanitizedEntries = entries.map(entry => ({
      ...entry,
      metadata: {
        name: entry.metadata?.name || null,
        description: entry.metadata?.description || null,
        createdAt: entry.metadata?.createdAt || null,
        updatedAt: entry.metadata?.updatedAt || null,
        status: entry.metadata?.status || null,
        statusUpdatedAt: entry.metadata?.statusUpdatedAt || null,
      }
    }));

    return NextResponse.json(sanitizedEntries);
  } catch (error) {
    console.error('Error fetching entries:', error);
    return NextResponse.json({ error: 'Failed to fetch entries' }, { status: 500 });
  }
}