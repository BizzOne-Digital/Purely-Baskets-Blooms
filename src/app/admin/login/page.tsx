import { Suspense } from 'react';
import AdminLoginForm from './LoginForm';

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#241920]">
        <p className="text-[#F5D6DC]">Loading...</p>
      </div>
    }>
      <AdminLoginForm />
    </Suspense>
  );
}
