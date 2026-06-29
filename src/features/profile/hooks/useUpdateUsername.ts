"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import updateUsername from "../actions/updateUsername";

export function useUpdateUsername() {
  return useMutation({
    mutationFn: (username: string) => updateUsername(username),
    onError: (error: Error) => {
      toast.error(`Fehler: ${error.message}`);
    },
    onSuccess: () => {
      toast.success("Benutzername wurde gespeichert.");
    },
  });
}
