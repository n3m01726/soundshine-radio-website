import React, { useEffect, useState } from "react";

function Charts() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/charts")
      .then((res) => res.json())
      .then(setSongs)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <div
        className="posts-img"
        style={{
          backgroundImage: "url('uploads/posts/pexels-yan-krukau-9002798')",
          paddingTop: "15%",
        }}
      >
        <h3 className="text-center post-title">
          <b>Charts</b>
        </h3>
      </div>
      <div>
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto" style={{ padding: 20 }}>
              <div className="post-content" style={{ padding: 20 }}>
                <div className="container">
                  <div className="row">
                    <table className="table table-light table-striped">
                      <thead>
                        <tr>
                          <th>Position</th>
                          <th>Title</th>
                          <th>Artists</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading && (
                          <tr>
                            <td colSpan={3}>Chargement...</td>
                          </tr>
                        )}
                        {error && (
                          <tr>
                            <td colSpan={3} style={{ color: "red" }}>
                              Erreur : {error}
                            </td>
                          </tr>
                        )}
                        {!loading && !error && songs.length === 0 && (
                          <tr>
                            <td colSpan={3}>Aucune chanson trouvée.</td>
                          </tr>
                        )}
                        {!loading &&
                          !error &&
                          songs.map((song, i) => (
                            <tr key={song.id || song.ID}>
                              <td>{i + 1}</td>
                              <td>{song.title}</td>
                              <td>{song.artist}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
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

export default Charts;
