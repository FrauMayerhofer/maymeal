import * as z from "zod";

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Mindestens 8 Zeichen"),
});
/*
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwörter stimmen nicht überein",
  });
  */

export type SignInInput = z.infer<typeof signInSchema>;
