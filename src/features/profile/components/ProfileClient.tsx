"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@supabase/supabase-js";
import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import LogoutButton from "@/features/auth/components/LogoutButton";
import { useResetPassword } from "../hooks/useResetPassword";
import { useUpdateUsername } from "../hooks/useUpdateUsername";
import { UsernameInput, usernameSchema } from "../schemas/username";

const themes = [
  { value: "light", label: "Hell", icon: Sun },
  { value: "dark", label: "Dunkel", icon: Moon },
  { value: "system", label: "System", icon: SunMoon },
] as const;

export function ProfileClient({ user }: { user: User }) {
  const { theme, setTheme } = useTheme();
  const { mutate: updateUsername, isPending: isUpdating } = useUpdateUsername();
  const { mutate: resetPassword, isPending: isResetting } = useResetPassword();

  const form = useForm<UsernameInput>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: user.user_metadata?.username ?? "",
    },
  });

  function onSubmit(data: UsernameInput) {
    updateUsername(data.username);
  }

  return (
    <div className="mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Profil</h1>
        <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
      </div>

      <Separator />

      {/* Username */}
      <Card>
        <CardHeader>
          <CardTitle>Benutzername</CardTitle>
          <CardDescription>Dein Anzeigename innerhalb der App.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="username">Benutzername</FieldLabel>
                    <Input
                      {...field}
                      id="username"
                      placeholder="dein_name"
                      autoComplete="username"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <Button
              type="submit"
              className="mt-4"
              disabled={isUpdating || !form.formState.isDirty}
            >
              {isUpdating ? "Speichern…" : "Speichern"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Theme */}
      <Card>
        <CardHeader>
          <CardTitle>Erscheinungsbild</CardTitle>
          <CardDescription>
            Wähle zwischen hellem und dunklem Modus.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {themes.map(({ value, label, icon: Icon }) => (
              <Button
                key={value}
                variant={theme === value ? "default" : "outline"}
                onClick={() => setTheme(value)}
                className="flex-1 gap-2"
              >
                <Icon className="size-4" />
                {label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Password Reset */}
      <Card>
        <CardHeader>
          <CardTitle>Passwort zurücksetzen</CardTitle>
          <CardDescription>
            Wir senden dir eine E-Mail an{" "}
            <span className="font-medium text-foreground">{user.email}</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            disabled={isResetting}
            onClick={() => resetPassword(user.email!)}
          >
            {isResetting ? "Wird gesendet…" : "Reset-E-Mail senden"}
          </Button>
        </CardContent>
      </Card>

      {/* Logout */}
      <Card>
        <CardHeader>
          <CardTitle>Abmelden</CardTitle>
          <CardDescription>Beende deine aktuelle Sitzung.</CardDescription>
        </CardHeader>
        <CardContent>
          <LogoutButton />
        </CardContent>
      </Card>
    </div>
  );
}
