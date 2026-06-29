import type { Metadata } from "next";
import { RegisterForm } from "@/features/auth/forms/RegisterForm";

export const metadata: Metadata = { title: "Registrieren" };

export default function RegisterPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Konto erstellen</h2>
      <p className="text-muted-foreground mb-6">
        Starte kostenlos und entdecke tausende Rezepte
      </p>
      <RegisterForm />
    </div>
  );
}
