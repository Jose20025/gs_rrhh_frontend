import kaisLogo from '@/assets/images/kais-white-logo.png';
import { LoginForm } from '../components';

export const LoginPage = () => {
  return (
    <div className="grid h-dvh grid-cols-2">
      <section className="flex flex-col gap-4 p-10">
        <main className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </main>
      </section>

      <section className="bg-kais-primary relative">
        <img
          src={kaisLogo}
          alt="KAIS Logo"
          className="absolute inset-0 h-full w-full object-contain p-10"
        />
      </section>
    </div>
  );
};
