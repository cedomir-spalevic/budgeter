export const toCurrency = (n: number) => new Intl.NumberFormat("en-us", { style: "currency", currency: "USD" }).format(n);

export const toNumber = (s: string) => Number(Number(s.replace(/[^0-9.-]+/g, "")).toFixed(2));