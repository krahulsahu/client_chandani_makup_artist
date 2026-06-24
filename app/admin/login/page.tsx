import LoginForm from '@/components/admin/LoginForm';

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF6F0] p-4 relative overflow-hidden">
      {/* Background glow design */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#EAE5DA] opacity-30 blur-3xl" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#C5A880] opacity-20 blur-3xl" />

      <div className="z-10 w-full flex flex-col items-center">
        {/* Luxury Brand Styling */}
        <div className="mb-8 text-center">
          <h1 className="font-serif text-4xl tracking-widest text-[#2C221E] uppercase">
            Chandani Kumari
          </h1>
          <p className="mt-2 font-serif italic text-[#AF8F58] tracking-widest text-sm">
            Luxury Makeup Artist & Beauty Specialist
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
