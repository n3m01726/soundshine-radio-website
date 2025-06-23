import React, { useEffect, useState } from "react";
import { fetchLastPlayed } from "../api/lastPlayed";

function LastPlayedWidget() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLastPlayed()
      .then(setSongs)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Chargement…</div>;

  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-4">Last played songs</h3>
      <ul>
        {songs.map((song) => (
          <li key={song.id} className="flex items-center gap-4 mb-2">
            <img
              src={song.image}
              alt={song.title}
              className="w-12 h-12 rounded object-cover"
            />
            <div>
              <div className="font-semibold">{song.title}</div>
              <div className="text-gray-500">{song.artist}</div>
              <div className="text-xs text-gray-400">{song.date_played}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default LastPlayedWidget;
