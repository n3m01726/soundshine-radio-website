export async function fetchLastPlayed() {
  const API_URL = process.env.REACT_APP_API_URL || "";
  const res = await fetch(`${API_URL}/api/lastplayed`);
  if (!res.ok) throw new Error("Erreur lors du chargement des morceaux joués");
  return res.json();
}
