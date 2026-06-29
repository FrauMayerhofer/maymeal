import { ShoppingList } from "@/features/shopping/components/ShoppingList";

export default function Page() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold">Einkaufsliste</h2>
        <p className="text-sm text-muted-foreground">
          Zutaten verwalten und aus dem Wochenplan importieren
        </p>
      </div>
      <ShoppingList />
    </div>
  );
}
