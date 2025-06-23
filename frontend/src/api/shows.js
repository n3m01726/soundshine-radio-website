export async function fetchShows() {
  const API_URL = process.env.REACT_APP_API_URL || "";
  const res = await fetch(`${API_URL}/api/shows`);
  if (!res.ok) throw new Error("Erreur lors du chargement des shows");
  return res.json();
}
