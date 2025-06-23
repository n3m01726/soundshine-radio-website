import React, { useEffect, useState } from "react";

function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // À brancher sur l'API /api/team
    // fetch("http://localhost:4000/api/team")
    //   .then((res) => res.json())
    //   .then(setMembers)
    //   .catch((err) => setError(err.message))
    //   .finally(() => setLoading(false));
    setLoading(false);
    setMembers([
      // Fake data pour dev
      { id: 1, name: "Alice", role: "Présidente", avatar: "avatar1.png" },
      { id: 2, name: "Bob", role: "Animateur", avatar: "avatar2.png" },
      { id: 3, name: "Charlie", role: "Technicien", avatar: "avatar3.png" },
    ]);
  }, []);

  return (
    <section>
      <div
        className="posts-img"
        style={{
          backgroundImage:
            "url('uploads/posts/pexels-george-milton-6954180.jpg')",
          paddingTop: "15%",
        }}
      >
        <h3 className="text-center post-title">
          <b>L'équipe Soundshine Radio</b>
        </h3>
      </div>
      <div>
        <div className="container content">
          <div className="row">
            <div className="col-10 mx-auto" style={{ padding: 20 }}>
              <div className="post-content" style={{ padding: 20 }}>
                <div className="container">
                  <div className="row text-center">
                    {loading && <div>Chargement...</div>}
                    {error && (
                      <div style={{ color: "red" }}>Erreur : {error}</div>
                    )}
                    {!loading &&
                      !error &&
                      members.map((member) => (
                        <div className="col-md-4 mb-4" key={member.id}>
                          <img
                            src={`uploads/profile/${member.avatar}`}
                            alt={member.name}
                            className="rounded-circle mb-2"
                            width="120"
                            height="120"
                          />
                          <h5>{member.name}</h5>
                          <p className="text-secondary">{member.role}</p>
                        </div>
                      ))}
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

export default Team;
