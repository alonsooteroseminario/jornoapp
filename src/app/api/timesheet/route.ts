import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const entries = await prisma.timesheetEntry.findMany()
    return NextResponse.json(entries)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch entries' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log('Create entry:', data);
    // Ensure the id is not included in the create operation
    const { id, ...restData } = data;

    const entry = await prisma.timesheetEntry.create({
      data: {
        ...restData,
        metadata: {
          name: data.metadata.name,
          description: data.metadata.description,
          createdBy: data.metadata.createdBy || '',
          createdAt: data.metadata.createdAt,
          updatedAt: data.metadata.updatedAt,
          status: data.metadata.status,
          statusUpdatedAt: data.metadata.statusUpdatedAt,
        }
      }
    });

    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    console.error('Error creating entry:', error);
    return NextResponse.json({ error: 'Failed to create entry' }, { status: 500 });
  }
}