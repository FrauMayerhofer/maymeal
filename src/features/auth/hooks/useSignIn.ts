"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import signIn from "../actions/signIn";
import { SignInInput } from "../schemas/sign-in";
import { ROUTES } from "@/constants/routes";

export function useSignIn() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: SignInInput) => signIn(data),
    onError: (error: Error) => {
      toast.error(`Anmeldung fehlgeschlagen: ${error.message}`);
    },
    onSuccess: () => {
      toast.success(`Anmeldung war erfolgreich!`);
      router.push(ROUTES.afterLogin);
    },
  });
}
