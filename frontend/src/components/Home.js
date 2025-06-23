import React, { useEffect, useState } from "react";
import { fetchPosts } from "../api/posts";
import { fetchShows } from "../api/shows";
import { fetchCharts } from "../api/charts";
import LastPlayedWidget from "./LastPlayedWidget";
import RequestsWidget from "./RequestsWidget";
import EventsWidget from "./EventsWidget";

function Home() {
  const [posts, setPosts] = useState([]);
  const [shows, setShows] = useState([]);
  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([fetchPosts(), fetchShows(), fetchCharts()])
      .then(([postsData, showsData, chartsData]) => {
        setPosts(postsData.slice(0, 3));
        setShows(showsData.slice(0, 3));
        setCharts(chartsData.slice(0, 5));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Chargement…</div>;
  if (error) return <div style={{ color: "red" }}>Erreur : {error}</div>;

  return (
    <div className="max-w-5xl mx-auto py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Colonne principale */}
      <div className="lg:col-span-2 space-y-8">
        <div className="card">
          <h3 className="text-2xl font-bold text-title mb-4">News / Blogs</h3>
          <ul>
            {posts.map((post) => (
              <li key={post.id} className="p-4 bg-white rounded shadow mb-2">
                <b>{post.title}</b>
                <div>{post.content?.slice(0, 100)}…</div>
              </li>
            ))}
          </ul>
        </div>
        <LastPlayedWidget />
        <div className="card">
          <h3 className="text-2xl font-bold text-title mb-4">Top Charts</h3>
          <ul>
            {charts.map((track, i) => (
              <li key={track.id || i} className="p-2">
                <span className="font-bold">{i + 1}.</span> {track.title}{" "}
                <span className="text-gray-500">({track.artist})</span>
              </li>
            ))}
          </ul>
        </div>
        <EventsWidget />
      </div>
      {/* Colonne latérale */}
      <div className="space-y-8">
        <RequestsWidget />
        <div className="card">
          <h3 className="text-2xl font-bold text-title mb-4">
            Prochains shows
          </h3>
          <ul>
            {shows.map((show) => (
              <li
                key={show.id || show.ID}
                className="p-4 bg-white rounded shadow mb-2"
              >
                <b>{show.name || show.NAME}</b>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
