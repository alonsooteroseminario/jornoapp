import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-grow flex items-center justify-center">
        <SignIn />
      </main>
    </div>
  );
};

export default SignInPage;