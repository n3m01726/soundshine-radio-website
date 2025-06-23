import React, { useState } from "react";

const days = [
  { key: "monday", label: "Monday", code: "&1" },
  { key: "tuesday", label: "Tuesday", code: "&2" },
  { key: "wednesday", label: "Wednesday", code: "&3" },
  { key: "thursday", label: "Thursday", code: "&4" },
  { key: "friday", label: "Friday", code: "&5" },
  { key: "saturday", label: "Saturday", code: "&6" },
  { key: "sunday", label: "Sunday", code: "&0" },
];

function Schedule() {
  const [activeDay, setActiveDay] = useState("monday");

  return (
    <section>
      <div
        className="posts-img"
        style={{
          backgroundImage: "url('uploads/posts/pexels-pixabay-164425.jpg')",
          paddingTop: "15%",
        }}
      >
        <h3 className="text-center post-title">
          <b>Schedule</b>
        </h3>
      </div>
      <div>
        <div className="container content">
          <div className="row">
            <div className="col-10 mx-auto" style={{ padding: 20 }}>
              <div
                className="post-content"
                style={{ padding: 20, minHeight: 500 }}
              >
                <div className="container">
                  <div className="row">
                    <div className="idance">
                      <div className="schedule content-block">
                        <div className="container">
                          <div className="timetable">
                            <nav>
                              <div className="nav nav-tabs" role="tablist">
                                {days.map((day) => (
                                  <button
                                    key={day.key}
                                    className={
                                      "nav-link" +
                                      (activeDay === day.key ? " active" : "")
                                    }
                                    onClick={() => setActiveDay(day.key)}
                                    type="button"
                                    role="tab"
                                  >
                                    {day.label}
                                  </button>
                                ))}
                              </div>
                            </nav>
                            <div
                              className="tab-content"
                              style={{ marginTop: 20 }}
                            >
                              {days.map((day) => (
                                <div
                                  key={day.key}
                                  className={
                                    "tab-pane fade" +
                                    (activeDay === day.key
                                      ? " show active"
                                      : "")
                                  }
                                  role="tabpanel"
                                >
                                  {/* À brancher sur l'API : getSchedule(day.code, 98) */}
                                  <div>Grille à venir pour {day.label}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Schedule;
