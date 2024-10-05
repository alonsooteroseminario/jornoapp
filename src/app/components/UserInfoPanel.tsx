interface UserInfoPanelProps {
    user: any
    timesheetCount: number;
}

export const UserInfoPanel = ({ user, timesheetCount }: UserInfoPanelProps) => (
<div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto mt-8">
    <h2 className="text-2xl font-bold mb-4">User Information</h2>
    <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
    <p><strong>Email:</strong> {user.emailAddresses[0].emailAddress}</p>
    <p><strong>Timesheets Created:</strong> {timesheetCount}</p>
</div>
);