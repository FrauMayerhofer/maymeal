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
import { Separator } from "@/components/ui/separator";
import { useSignUp } from "../hooks/useSignUp";
import { SignUpInput, signUpSchema } from "../schemas/sign-up";
import { ROUTES } from "@/constants/routes";

export function RegisterForm() {
  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { mutate, isPending } = useSignUp();

  function onSubmit(data: SignUpInput) {
    mutate(data);
  }

  return (
    <Card className="w-full sm:max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Konto erstellen</CardTitle>
        <CardDescription>Registriere dich, um loszulegen.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="sign-up-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="sign-up-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="sign-up-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Erika Musterfrau"
                    autoComplete="name"
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
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="sign-up-email">E-Mail</FieldLabel>
                  <Input
                    {...field}
                    id="sign-up-email"
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
                  <FieldLabel htmlFor="sign-up-password">Passwort</FieldLabel>
                  <Input
                    {...field}
                    id="sign-up-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Mindestens 8 Zeichen"
                    autoComplete="new-password"
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
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="sign-up-confirm-password">
                    Passwort bestätigen
                  </FieldLabel>
                  <Input
                    {...field}
                    id="sign-up-confirm-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Passwort wiederholen"
                    autoComplete="new-password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Button type="submit" className="mt-4 w-full" disabled={isPending}>
            {isPending ? "Registrieren…" : "Registrieren"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <Separator />
        <p className="text-sm text-muted-foreground">
          Schon ein Konto?{" "}
          <Link
            href={ROUTES.login}
            className="text-primary font-medium underline-offset-4 hover:underline"
          >
            Jetzt anmelden
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
