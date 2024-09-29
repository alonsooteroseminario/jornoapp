import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { clerkClient } from '@clerk/nextjs/server';


export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Fetch user data from Clerk
    const clerkUser = await clerkClient.users.getUser(userId);

    // Check if user exists in our database
    let user = await prisma.user.findUnique({ where: { email: clerkUser.emailAddresses[0].emailAddress } });

    if (user) {
      // Update existing user
      user = await prisma.user.update({
        where: { email: clerkUser.emailAddresses[0].emailAddress },
        data: {
          firstName: clerkUser.firstName,
          lastName: clerkUser.lastName,
          // Add any other fields you want to update
        },
      });
    } else {
      // Create new user
      user = await prisma.user.create({
        data: {
          email: clerkUser.emailAddresses[0].emailAddress,
          firstName: clerkUser.firstName,
          lastName: clerkUser.lastName,
          // Add any other fields you want to set for new users
        },
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error in user sync:', error);
    return NextResponse.json({ error: 'Failed to sync user' }, { status: 500 });
  }
}