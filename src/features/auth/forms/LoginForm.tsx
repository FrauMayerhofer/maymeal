"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSignIn } from "../hooks/useSignIn";
import { SignInInput, signInSchema } from "../schemas/sign-in";
import { ROUTES } from "@/constants/routes";

export function LoginForm() {
  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate, isPending } = useSignIn();

  function onSubmit(data: SignInInput) {
    mutate(data);
  }

  return (
    <Card className="w-full sm:max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Willkommen</CardTitle>
        <CardDescription>
          Melde dich mit deiner E-Mail-Adresse an.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="sign-in-form" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="sign-in-email">E-Mail</FieldLabel>
                    <Input
                      {...field}
                      id="sign-in-email"
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="erika@beispiel.de"
                      autoComplete="email"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="sign-in-password">Passwort</FieldLabel>
                    <Input
                      {...field}
                      id="sign-in-password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Mindestens 8 Zeichen"
                      autoComplete="current-password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
          <Button type="submit" className="mt-4 w-full" disabled={isPending}>
            {isPending ? "Anmelden…" : "Anmelden"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <p className="text-sm text-muted-foreground">
          Noch kein Konto?{" "}
          <Link
            href={ROUTES.register}
            className="text-primary font-medium underline-offset-4 hover:underline"
          >
            Jetzt registrieren
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
