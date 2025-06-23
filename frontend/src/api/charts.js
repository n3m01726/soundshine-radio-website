export async function fetchCharts() {
  const API_URL = process.env.REACT_APP_API_URL || "";
  const res = await fetch(`${API_URL}/api/charts`);
  if (!res.ok) throw new Error("Erreur lors du chargement des charts");
  return res.json();
}
