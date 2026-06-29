"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import signIn from "../actions/signIn";
import { SignInInput } from "../schemas/sign-in";

export function useSignIn() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: SignInInput) => signIn(data),
    onError: (error: Error) => {
      toast.error(`Anmeldung fehlgeschlagen: ${error.message}`);
    },
    onSuccess: () => {
      router.push("/");
    },
  });
}
