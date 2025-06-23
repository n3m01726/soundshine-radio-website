export async function fetchRequests() {
  const API_URL = process.env.REACT_APP_API_URL || "";
  const res = await fetch(`${API_URL}/api/requests`);
  if (!res.ok) throw new Error("Erreur lors du chargement des requests");
  return res.json();
}
