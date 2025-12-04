export const API_URL = import.meta.env.VITE_API_URL || "";

export async function getCoffees() {
  const base = API_URL || ""; // empty -> relative
  const res = await fetch(`${base}/coffees`, {
    method: "GET",
    headers: { "Accept": "application/json" },
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`API error ${res.status}: ${txt}`);
  }
  return res.json();
}
