"use client";

import {
  Control,
  Controller,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  RecipeFormInput,
  recipeFormSchema,
  type RecipePayload,
} from "../schemas/recipe";
import { CATEGORIES } from "../constants";
import { toPayload } from "../utils/formatPayload";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "../components/ImageUpload";

const DIFFICULTY_OPTIONS = ["Einfach", "Mittel", "Anspruchsvoll"] as const;

interface IngredientSectionFieldsProps {
  control: Control<RecipeFormInput>;
  groupIndex: number;
  showRemoveGroup: boolean;
  onRemoveGroup: () => void;
  itemsError?: string;
}

function IngredientSectionFields({
  control,
  groupIndex,
  showRemoveGroup,
  onRemoveGroup,
  itemsError,
}: IngredientSectionFieldsProps) {
  const items = useFieldArray({
    control,
    name: `ingredients.${groupIndex}.items`,
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Controller
          name={`ingredients.${groupIndex}.section`}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              className="max-w-xs"
              placeholder="Abschnitt (optional), z.B. Für die Sauce"
            />
          )}
        />
        {showRemoveGroup && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0 text-muted-foreground hover:text-destructive"
            onClick={onRemoveGroup}
          >
            <Trash2 className="size-4" />
          </Button>
        )}
      </div>

      {items.fields.map((field, index) => (
        <div key={field.id} className="flex items-start gap-2">
          <span className="mt-2.5 text-xs font-medium text-muted-foreground w-5 text-right shrink-0">
            {index + 1}.
          </span>
          <Controller
            name={`ingredients.${groupIndex}.items.${index}.name`}
            control={control}
            render={({ field: f, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex-1">
                {index === 0 && <FieldLabel>Name</FieldLabel>}
                <Input
                  {...f}
                  aria-invalid={fieldState.invalid}
                  placeholder="Zutat"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name={`ingredients.${groupIndex}.items.${index}.amount`}
            control={control}
            render={({ field: f, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="w-20 shrink-0"
              >
                {index === 0 && <FieldLabel>Menge</FieldLabel>}
                <Input
                  type="number"
                  min={0}
                  step="0.1"
                  placeholder="0"
                  aria-invalid={fieldState.invalid}
                  value={f.value ?? ""}
                  onChange={(e) =>
                    f.onChange(
                      e.target.value === "" ? 0 : Number(e.target.value),
                    )
                  }
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name={`ingredients.${groupIndex}.items.${index}.unit`}
            control={control}
            render={({ field: f, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="w-24 shrink-0"
              >
                {index === 0 && <FieldLabel>Einheit</FieldLabel>}
                <Input
                  {...f}
                  aria-invalid={fieldState.invalid}
                  placeholder="g, ml, Stk."
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn(
              "shrink-0 text-muted-foreground hover:text-destructive",
              index === 0 && "mt-6",
            )}
            onClick={() => items.remove(index)}
            disabled={items.fields.length <= 1}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}
      {itemsError && <p className="text-sm text-destructive">{itemsError}</p>}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => items.append({ name: "", amount: 0, unit: "" })}
      >
        <Plus className="size-4 mr-1.5" />
        Zutat hinzufügen
      </Button>
    </div>
  );
}

interface RecipeFormProps {
  defaultValues?: RecipeFormInput;
  onSubmit: (payload: RecipePayload, imageFile: File | null) => void;
  isPending: boolean;
  submitLabel?: string;
}

export function RecipeForm({
  defaultValues,
  onSubmit,
  isPending,
  submitLabel = "Speichern",
}: RecipeFormProps) {
  const [servings, setServings] = useState(defaultValues?.servings ?? 2);
  const imageFileRef = useRef<File | null>(null);
  const form = useForm<RecipeFormInput>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: defaultValues ?? {
      imageUrl: null,
      title: "",
      description: "",
      category: "Mittagessen",
      difficulty: "Einfach",
      duration: 30,
      servings: 2,
      calories: 0,
      tags: "",
      ingredients: [
        { section: "", items: [{ name: "", amount: 0, unit: "" }] },
      ],
      instructions: [{ value: "" }],
      protein: 0,
      carbs: 0,
      fat: 0,
    },
  });

  const ingredients = useFieldArray({
    control: form.control,
    name: "ingredients",
  });
  const instructions = useFieldArray({
    control: form.control,
    name: "instructions",
  });

  function handleSubmit(data: RecipeFormInput) {
    onSubmit(toPayload(data), imageFileRef.current);
  }

  return (
    <form
      onSubmit={(e) => form.handleSubmit(handleSubmit)(e)}
      className="space-y-6"
    >
      {/* Grundinfo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Grundinfo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel>Bild</FieldLabel>
              <Controller
                name="imageUrl"
                control={form.control}
                render={({ field }) => (
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    onFileSelect={(file) => {
                      imageFileRef.current = file;
                    }}
                  />
                )}
              />
            </Field>
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">Titel</FieldLabel>
                  <Input
                    {...field}
                    id="title"
                    aria-invalid={fieldState.invalid}
                    placeholder="z.B. Spaghetti Carbonara"
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
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">Beschreibung</FieldLabel>
                  <Textarea
                    {...field}
                    id="description"
                    aria-invalid={fieldState.invalid}
                    placeholder="Kurze Beschreibung des Rezepts..."
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup>
            <div className="grid grid-cols-2 gap-3">
              <Controller
                name="category"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="category">Kategorie</FieldLabel>
                    <Select
                      aria-invalid={fieldState.invalid}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger id="category" className="w-full max-w-48">
                        <SelectValue placeholder="wähle eine Kategorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {CATEGORIES.filter((c) => c !== "Alle").map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="difficulty"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="difficulty">Schwierigkeit</FieldLabel>
                    <Select
                      aria-invalid={fieldState.invalid}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="difficulty"
                        className="w-full max-w-48"
                      >
                        <SelectValue placeholder="wähle eine Schwierigkeit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {DIFFICULTY_OPTIONS.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
        </CardContent>
      </Card>

      {/* Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Details</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <div className="grid grid-cols-3 gap-3">
              <Controller
                name="duration"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="duration">Dauer (Min.)</FieldLabel>
                    <Input
                      id="duration"
                      type="number"
                      min={1}
                      aria-invalid={fieldState.invalid}
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? 0 : Number(e.target.value),
                        )
                      }
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="servings"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="servings">Portionen</FieldLabel>
                    <Input
                      id="servings"
                      type="number"
                      min={1}
                      aria-invalid={fieldState.invalid}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value =
                          e.target.value === "" ? 0 : Number(e.target.value);
                        field.onChange(value);
                        setServings(value);
                      }}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="calories"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="calories">Kalorien (kcal)</FieldLabel>
                    <Input
                      id="calories"
                      type="number"
                      min={0}
                      aria-invalid={fieldState.invalid}
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? 0 : Number(e.target.value),
                        )
                      }
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
        </CardContent>
      </Card>

      {/* Nährwerte */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Nährwerte pro {servings} Portionen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <div className="grid grid-cols-3 gap-3">
              {(["protein", "carbs", "fat"] as const).map((macro) => (
                <Controller
                  key={macro}
                  name={macro}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={macro}>
                        {macro === "protein"
                          ? "Protein (g)"
                          : macro === "carbs"
                            ? "Kohlenhydrate (g)"
                            : "Fett (g)"}
                      </FieldLabel>
                      <Input
                        id={macro}
                        type="number"
                        min={0}
                        aria-invalid={fieldState.invalid}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === "" ? 0 : Number(e.target.value),
                          )
                        }
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              ))}
            </div>
          </FieldGroup>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Controller
              name="tags"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="tags">Tags (kommagetrennt)</FieldLabel>
                  <Input
                    {...field}
                    id="tags"
                    aria-invalid={fieldState.invalid}
                    placeholder="Vegetarisch, Schnell, Proteinreich"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>
      </Card>

      {/* Zutaten */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Zutaten</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {ingredients.fields.map((field, groupIndex) => (
            <div key={field.id} className="space-y-3">
              <IngredientSectionFields
                control={form.control}
                groupIndex={groupIndex}
                showRemoveGroup={ingredients.fields.length > 1}
                onRemoveGroup={() => ingredients.remove(groupIndex)}
                itemsError={
                  form.formState.errors.ingredients?.[groupIndex]?.items
                    ?.root?.message
                }
              />
              {groupIndex < ingredients.fields.length - 1 && <Separator />}
            </div>
          ))}
          {form.formState.errors.ingredients?.root && (
            <p className="text-sm text-destructive">
              {form.formState.errors.ingredients.root.message}
            </p>
          )}
          <Separator />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              ingredients.append({
                section: "",
                items: [{ name: "", amount: 0, unit: "" }],
              })
            }
          >
            <Plus className="size-4 mr-1.5" />
            Abschnitt hinzufügen
          </Button>
        </CardContent>
      </Card>

      {/* Zubereitung */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Zubereitung</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {instructions.fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-2">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold mt-2">
                {index + 1}
              </span>
              <Controller
                name={`instructions.${index}.value`}
                control={form.control}
                render={({ field: f, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="flex-1">
                    <Textarea
                      {...f}
                      aria-invalid={fieldState.invalid}
                      placeholder="Schritt beschreiben..."
                      rows={2}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="shrink-0 mt-1 text-muted-foreground hover:text-destructive"
                onClick={() => instructions.remove(index)}
                disabled={instructions.fields.length <= 1}
              >
                <Minus className="size-4" />
              </Button>
            </div>
          ))}
          {form.formState.errors.instructions?.root && (
            <p className="text-sm text-destructive">
              {form.formState.errors.instructions.root.message}
            </p>
          )}
          <Separator />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => instructions.append({ value: "" })}
          >
            <Plus className="size-4 mr-1.5" />
            Schritt hinzufügen
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3 pb-6">
        <Button type="button" variant="outline" onClick={() => history.back()}>
          Abbrechen
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Wird gespeichert…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
