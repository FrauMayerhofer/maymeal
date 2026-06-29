"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import resetPassword from "../actions/resetPassword";

export function useResetPassword() {
  return useMutation({
    mutationFn: (email: string) => resetPassword(email),
    onError: (error: Error) => {
      toast.error(`Fehler: ${error.message}`);
    },
    onSuccess: () => {
      toast.success("E-Mail zum Zurücksetzen wurde gesendet.");
    },
  });
}
