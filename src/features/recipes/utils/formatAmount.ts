export function formatAmount(amount: number): string {
  if (amount === 0) return "–";
  const rounded = Math.round(amount * 10) / 10;
  return rounded % 1 === 0
    ? String(rounded)
    : rounded.toFixed(1).replace(".", ",");
}
