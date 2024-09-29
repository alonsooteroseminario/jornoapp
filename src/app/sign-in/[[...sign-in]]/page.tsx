import UserSync from '@/app/components/UserSync';
import { SignIn } from '@clerk/nextjs';


const SignInPage = () => {
  return (
    <main className="auth-page">
      <SignIn />
      <UserSync />
    </main>
  );
};

export default SignInPage;