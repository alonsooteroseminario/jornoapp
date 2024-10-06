import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// src/app/api/timesheet/share/route.ts
export async function POST(req: NextRequest) {
  try {
    const { timesheetId, emailToShare } = await req.json();
    console.log('Received request:', { timesheetId, emailToShare });

    if (!timesheetId || !emailToShare) {
      console.log('Bad request: Missing timesheetId or emailToShare');
      return NextResponse.json({ error: 'Timesheet ID and email are required' }, { status: 400 });
    }

    const timesheet = await prisma.timesheetEntry.findUnique({
      where: { id: timesheetId },
    });

    if (!timesheet) {
      console.log('Timesheet not found:', timesheetId);
      return NextResponse.json({ error: 'Timesheet not found' }, { status: 404 });
    }

    const updatedTimesheet = await prisma.timesheetEntry.update({
      where: { id: timesheetId },
      data: {
        sharedWithEmails: {
          push: emailToShare
        }
      },
    });

    console.log('Timesheet updated successfully:', updatedTimesheet.id);
    return NextResponse.json(updatedTimesheet);
  } catch (error) {
    console.error('Error sharing timesheet:', error);
    return NextResponse.json({ error: 'Failed to share timesheet' }, { status: 500 });
  }
}