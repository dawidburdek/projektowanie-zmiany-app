"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { signup } from "@/actions/auth";

const initialState = { error: undefined as string | undefined };

export default function SignupPage() {
  const [state, action, pending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      const result = await signup(formData);
      return result ?? initialState;
    },
    initialState
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <h1 className="text-h4 font-semibold text-text-primary mb-1">Zarejestruj się</h1>
        <p className="text-small text-text-muted mb-6">Design Management</p>

        <form action={action} className="flex flex-col gap-4">
          <Input name="email" label="Email" type="email" placeholder="user@example.com" required />
          <Input name="password" label="Hasło" type="password" placeholder="min. 6 znaków" required />
          {state?.error && <p className="text-caption text-error">{state.error}</p>}
          <Button type="submit" disabled={pending}>
            {pending ? "Rejestracja..." : "Zarejestruj"}
          </Button>
        </form>

        <p className="text-caption text-text-muted mt-4 text-center">
          Masz już konto?{" "}
          <Link href="/login" className="text-accent-primary hover:underline">
            Zaloguj się
          </Link>
        </p>
      </div>
    </div>
  );
}
