import React, { useEffect, useState } from "react";
import { fetchEvents } from "../api/events";

function EventsWidget() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents()
      .then(setEvents)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Chargement…</div>;

  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-4">Events</h3>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="flex items-center gap-4 mb-2">
            <img
              src={event.image}
              alt={event.name}
              className="w-12 h-12 rounded object-cover"
            />
            <div>
              <div className="font-semibold">{event.name}</div>
              <div className="text-gray-500">{event.tags}</div>
              <div className="text-xs text-gray-400">
                {event.day} {event.time}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default EventsWidget;
