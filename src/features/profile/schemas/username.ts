import * as z from "zod";

export const usernameSchema = z.object({
  username: z
    .string()
    .min(2, "Mindestens 2 Zeichen")
    .max(30, "Maximal 30 Zeichen")
    .regex(/^[a-zA-Z0-9_.-]+$/, "Nur Buchstaben, Zahlen, _ . - erlaubt"),
});

export type UsernameInput = z.infer<typeof usernameSchema>;
