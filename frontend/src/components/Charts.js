import React, { useEffect, useState } from "react";

function Charts() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/charts")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(setSongs)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card overflow-hidden">
      {/* Header de la carte */}
      <div
        className="bg-gray-800 p-8 text-center"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/random/800x200?music')",
        }}
      >
        <h2 className="text-4xl font-extrabold text-white">Top 40 Charts</h2>
      </div>

      {/* Contenu de la carte (tableau) */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Position
                </th>
                <th scope="col" className="px-6 py-4">
                  Title
                </th>
                <th scope="col" className="px-6 py-4">
                  Artist
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="3" className="text-center p-6 text-gray-500">
                    Chargement...
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center p-6 text-red-500 font-semibold"
                  >
                    Erreur : {error}
                  </td>
                </tr>
              )}
              {!loading && !error && songs.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center p-6 text-gray-500">
                    Aucune chanson trouvée.
                  </td>
                </tr>
              )}
              {!loading &&
                !error &&
                songs.map((song, i) => (
                  <tr
                    key={song.id || song.ID}
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {i + 1}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {song.title}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {song.artist}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Charts;
