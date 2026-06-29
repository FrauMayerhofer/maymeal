import type { Metadata } from "next";
import { RegisterForm } from "@/features/auth/forms/RegisterForm";

export const metadata: Metadata = { title: "Registrieren" };

export default function RegisterPage() {
  return <RegisterForm />;
}
