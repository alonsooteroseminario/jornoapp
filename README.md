# JornoApp - Timesheet Management Application

## Project Overview
JornoApp is a Next.js TypeScript application designed for efficient timesheet management, particularly for camion drivers in the transport industry. The application uses Redux Toolkit for state management and integrates with Clerk for authentication.

## Key Features
1. User Authentication: Utilizes Clerk for secure sign-in and sign-up functionality.
2. Role-Based Access Control: Implements different access levels (ADMIN, MANAGER, USER) with corresponding permissions.
3. Timesheet Creation and Management: Allows users to create, view, and manage detailed timesheets.
4. Admin Panel: Provides administrative capabilities for user management and role assignment.
5. Document Management: Enables users to create, edit, and delete timesheet documents.

## Technical Stack
- Frontend: Next.js with TypeScript
- State Management: Redux Toolkit
- Authentication: Clerk
- Database: MongoDB with Prisma ORM
- Styling: Tailwind CSS

## Core Components
1. ECLEnterpriseForm: Main form component for timesheet entry.
2. UserManagement: Admin interface for managing users and roles.
3. AllDocuments: Displays all timesheet documents for admin and manager roles.
4. Navigation: Provides site-wide navigation with role-based access.

## State Management
- Uses Redux Toolkit for global state management.
- Key slices: userSlice, timesheetSlice, formSlice.

## API Routes
- User management (/api/user, /api/users)
- Timesheet operations (/api/timesheet)
- Profile management (/api/profile)

## Data Models
- User: Stores user information including role and profile details.
- TimesheetEntry: Contains detailed timesheet information.
- Profile: Additional user profile information.

## Styling and UI
- Utilizes Tailwind CSS for responsive and customized styling.
- Implements a dark theme with primary colors in shades of gray and blue.

## Future Enhancements
- Implement real-time collaboration features.
- Add more detailed reporting and analytics capabilities.
- Enhance mobile responsiveness for better on-the-go usage.