import React, { useEffect, useState } from "react";
import { fetchRequests } from "../api/requests";

function RequestsWidget() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests()
      .then(setRequests)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Chargement…</div>;

  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-4">Requests</h3>
      <ul>
        {requests.map((req) => (
          <li key={req.id} className="flex items-center gap-4 mb-2">
            <img
              src={req.image}
              alt={req.title}
              className="w-12 h-12 rounded object-cover"
            />
            <div>
              <div className="font-semibold">
                {req.title}{" "}
                <span className="text-gray-500">({req.artist})</span>
              </div>
              <div className="text-xs text-gray-400">
                Demandé par {req.username} le {req.requested}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default RequestsWidget;
