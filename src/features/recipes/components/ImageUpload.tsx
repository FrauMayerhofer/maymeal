"use client";

import { useRef, useState } from "react";
import { ImagePlus, Link, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  onFileSelect: (file: File | null) => void;
}

type Mode = "file" | "url";

export function ImageUpload({ value, onChange, onFileSelect }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<Mode>("file");
  const [urlInput, setUrlInput] = useState("");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    onFileSelect(file);
    onChange(previewUrl);
  }

  function handleUrlConfirm() {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    onFileSelect(null);
    onChange(trimmed);
  }

  function handleRemove() {
    if (value?.startsWith("blob:")) URL.revokeObjectURL(value);
    onFileSelect(null);
    onChange(null);
    setUrlInput("");
    if (inputRef.current) inputRef.current.value = "";
  }

  if (value) {
    return (
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted/50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={value} alt="Rezeptbild" className="w-full h-full object-cover" />
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className="absolute top-2 right-2 size-7"
          onClick={handleRemove}
        >
          <X className="size-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-1 rounded-lg bg-muted p-1 w-fit">
        <button
          type="button"
          onClick={() => setMode("file")}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-colors ${
            mode === "file"
              ? "bg-background shadow text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ImagePlus className="size-3.5" />
          Datei
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-colors ${
            mode === "url"
              ? "bg-background shadow text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Link className="size-3.5" />
          URL
        </button>
      </div>

      {mode === "file" ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border py-8 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
        >
          <ImagePlus className="size-8" />
          <span className="text-sm font-medium">Bild auswählen</span>
          <span className="text-xs">JPG, PNG oder WebP</span>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={handleFileChange}
          />
        </button>
      ) : (
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="https://beispiel.de/bild.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleUrlConfirm())}
          />
          <Button
            type="button"
            variant="secondary"
            onClick={handleUrlConfirm}
            disabled={!urlInput.trim()}
          >
            Übernehmen
          </Button>
        </div>
      )}
    </div>
  );
}
