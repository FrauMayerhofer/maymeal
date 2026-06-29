"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import signUp from "../actions/signUp";
import { SignUpInput } from "../schemas/sign-up";
import { ROUTES } from "@/constants/routes";

export function useSignUp() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: SignUpInput) => signUp(data),
    onError: (error: Error) => {
      toast.error(`Registrierung fehlgeschlagen: ${error.message}`);
    },
    onSuccess: () => {
      toast.success("Konto erstellt! Bitte bestätige deine E-Mail-Adresse.");
      router.push(ROUTES.login);
    },
  });
}
