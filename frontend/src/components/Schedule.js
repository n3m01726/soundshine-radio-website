import React, { useState, useEffect } from "react";
import { fetchSchedule } from "../api/schedule";

const days = [
  { key: "monday", label: "Lundi" },
  { key: "tuesday", label: "Mardi" },
  { key: "wednesday", label: "Mercredi" },
  { key: "thursday", label: "Jeudi" },
  { key: "friday", label: "Vendredi" },
  { key: "saturday", label: "Samedi" },
  { key: "sunday", label: "Dimanche" },
];

function Schedule() {
  const [activeDay, setActiveDay] = useState("monday");
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSchedule()
      .then(setSchedule)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <h2 className="text-3xl font-bold text-title mb-6">Programmation</h2>

      {/* Onglets de navigation pour les jours */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {days.map((day) => (
            <button
              key={day.key}
              onClick={() => setActiveDay(day.key)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  activeDay === day.key
                    ? "border-accent-red text-accent-red"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
            >
              {day.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Contenu de l'onglet actif */}
      <div className="mt-6">
        {loading ? (
          <p className="text-gray-500 py-8 text-center">Chargement…</p>
        ) : error ? (
          <p className="text-red-500 py-8 text-center">Erreur : {error}</p>
        ) : schedule[activeDay]?.length > 0 ? (
          <ul className="space-y-4">
            {schedule[activeDay].map((item, idx) => (
              <li
                key={item.time + idx}
                className="p-4 bg-gray-50 rounded-lg flex items-center"
              >
                <span className="text-lg font-bold text-accent-red w-24">
                  {item.time}
                </span>
                <div>
                  <p className="font-semibold text-title">{item.show}</p>
                  <p className="text-sm text-gray-600">avec {item.host}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 py-8 text-center">
            Aucune émission programmée pour ce jour.
          </p>
        )}
      </div>
    </div>
  );
}

export default Schedule;
