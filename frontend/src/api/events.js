export async function fetchEvents() {
  const API_URL = process.env.REACT_APP_API_URL || "";
  const res = await fetch(`${API_URL}/api/events`);
  if (!res.ok) throw new Error("Erreur lors du chargement des events");
  return res.json();
}
