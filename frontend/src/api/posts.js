export async function fetchPosts() {
  const API_URL = process.env.REACT_APP_API_URL || "";
  const res = await fetch(`${API_URL}/api/posts`);
  if (!res.ok) throw new Error("Erreur lors du chargement des posts");
  return res.json();
}
