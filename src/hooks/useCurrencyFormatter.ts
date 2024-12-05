import { useMemo } from "react";

export default function useCurrencyFormatter(
  value: number,
  locale = "en-US",
  currency = "USD"
): string {
  const formattedValue = useMemo(() => {
    if (Number.isNaN(value)) {
      return "";
    }
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      currencyDisplay: "symbol",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(value);
  }, [value, locale, currency]);
  return formattedValue;
}
