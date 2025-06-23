import React, { useEffect, useState } from "react";
import { fetchShows } from "../api/shows";

function ShowList() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchShows()
      .then(setShows)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Chargement des shows...</div>;
  if (error) return <div style={{ color: "red" }}>Erreur : {error}</div>;
  if (!shows.length) return <div>Aucun show trouvé.</div>;

  return (
    <div>
      <h3>Shows RadioDJ</h3>
      <ul>
        {shows.map((show) => (
          <li key={show.id || show.ID}>
            <b>{show.name || show.NAME}</b> (ID: {show.id || show.ID})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowList;
