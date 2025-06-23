import React, { useState } from "react";

const days = [
  { key: "monday", label: "Lundi" },
  { key: "tuesday", label: "Mardi" },
  { key: "wednesday", label: "Mercredi" },
  { key: "thursday", label: "Jeudi" },
  { key: "friday", label: "Vendredi" },
  { key: "saturday", label: "Samedi" },
  { key: "sunday", label: "Dimanche" },
];

const fakeSchedule = {
  monday: [
    { time: "08:00", show: "Morning Beats", host: "DJ Alex" },
    { time: "12:00", show: "Lunchtime Mix", host: "DJ Maria" },
  ],
  tuesday: [{ time: "18:00", show: "Drive Time", host: "DJ Chris" }],
  wednesday: [],
  thursday: [{ time: "20:00", show: "Rock On", host: "DJ Sam" }],
  friday: [
    { time: "22:00", show: "Club Night", host: "Guest DJ" },
    { time: "00:00", show: "After Hours", host: "DJ Night" },
  ],
  saturday: [{ time: "10:00", show: "Weekend Vibes", host: "DJ Jo" }],
  sunday: [],
};

function Schedule() {
  const [activeDay, setActiveDay] = useState("monday");

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
        {fakeSchedule[activeDay]?.length > 0 ? (
          <ul className="space-y-4">
            {fakeSchedule[activeDay].map((item) => (
              <li
                key={item.time}
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
