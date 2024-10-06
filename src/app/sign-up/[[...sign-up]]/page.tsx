import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center">
        <SignUp />
      </main>
    </div>
  );
};

export default SignUpPage;