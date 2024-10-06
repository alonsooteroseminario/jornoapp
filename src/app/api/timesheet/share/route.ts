import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { timesheetId, emailToShare } = await req.json();

    if (!timesheetId || !emailToShare) {
      return NextResponse.json({ error: 'Timesheet ID and email are required' }, { status: 400 });
    }

    // Check if the timesheet exists
    const timesheet = await prisma.timesheetEntry.findUnique({
      where: { id: timesheetId },
    });

    if (!timesheet) {
      return NextResponse.json({ error: 'Timesheet not found' }, { status: 404 });
    }

    // Check if the email is already in the sharedWithEmails array
    if (timesheet.sharedWithEmails && timesheet.sharedWithEmails.includes(emailToShare)) {
      return NextResponse.json({ error: 'Timesheet already shared with this email' }, { status: 400 });
    }

    // Update the timesheet
    const updatedTimesheet = await prisma.timesheetEntry.update({
      where: { id: timesheetId },
      data: {
        sharedWithEmails: {
          push: emailToShare
        }
      }
    });

    return NextResponse.json(updatedTimesheet);
  } catch (error) {
    console.error('Error sharing timesheet:', error);
    return NextResponse.json({ error: 'Failed to share timesheet' }, { status: 500 });
  }
}