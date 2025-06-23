export async function fetchSchedule() {
  const API_URL = process.env.REACT_APP_API_URL || "";
  const res = await fetch(`${API_URL}/api/schedule`);
  if (!res.ok) throw new Error("Erreur lors du chargement du schedule");
  return res.json();
}
