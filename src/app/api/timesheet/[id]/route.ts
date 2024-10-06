import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await prisma.timesheetEntry.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error deleting entry:', error);
    return NextResponse.json({ error: 'Failed to delete entry' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }

    const data = await req.json();
    const { 
      id: _, 
      metadata, 
      userId, 
      createdAt: __, 
      updatedAt: ___, 
      ...timesheetData 
    } = data;
    
    const currentDate = new Date().toISOString();

    const updatedEntry = await prisma.timesheetEntry.update({
      where: { id },
      data: {
        ...timesheetData,
        userId: userId || undefined,
        metadata: {
          update: {
            name: metadata?.name,
            description: metadata?.description,
            updatedAt: currentDate,
            status: metadata?.status,
            statusUpdatedAt: currentDate,
          },
        },
      },
    });

    return NextResponse.json(updatedEntry);
  } catch (error) {
    console.error('Error updating entry:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}