import { LoginForm } from "@/features/auth/forms/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Anmelden" };

export default function LoginPage() {
  return <LoginForm />;
}
