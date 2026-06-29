import { LoginForm } from "@/features/auth/forms/LoginForm";
import { LoginFormSkeleton } from "@/features/auth/forms/LoginFormSkeleton";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Anmelden" };

export default function LoginPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Willkommen zurück</h2>
      <p className="text-muted-foreground mb-6">
        Melde dich mit deinem Konto an
      </p>
      <Suspense fallback={<LoginFormSkeleton />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
