import * as z from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(1, "Name ist erforderlich"),
    email: z.email(),
    password: z.string().min(8, "Mindestens 8 Zeichen"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwörter stimmen nicht überein",
  });

export type SignUpInput = z.infer<typeof signUpSchema>;
