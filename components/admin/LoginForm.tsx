'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '@/lib/actions/adminActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const initialState = {
  success: false,
  error: '',
};

export default function LoginForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(loginAdmin, initialState);

  useEffect(() => {
    if (state?.success) {
      router.push('/admin/dashboard');
      router.refresh();
    }
  }, [state, router]);

  return (
    <Card className="w-full max-w-md border-[#EAE5DA] bg-[#FDFBF7] shadow-xl">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="font-serif text-3xl tracking-wide text-[#2C221E]">
          Admin Portal
        </CardTitle>
        <CardDescription className="font-sans text-sm text-[#AF8F58]">
          Log in to manage Chandani Kumari's digital platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="font-medium text-[#2C221E]">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Enter admin username"
              required
              className="border-[#EAE5DA] bg-white focus-visible:ring-[#D4AF37]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="font-medium text-[#2C221E]">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="border-[#EAE5DA] bg-white focus-visible:ring-[#D4AF37]"
            />
          </div>

          {state?.error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
              {state.error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#2C221E] hover:bg-[#AF8F58] text-[#FFFDD0] font-sans tracking-wider transition-colors duration-300"
          >
            {isPending ? 'Logging in...' : 'Sign In'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
