import React from "react";

function SingleShow({ show, episodes, info }) {
  // show : infos principales, episodes : liste, info : infos complémentaires
  if (!show) return <div>Chargement...</div>;
  return (
    <section>
      <div
        className="px-4 py-5 mb-4 text-center"
        style={{
          backgroundImage: `url('../uploads/shows/${show.image}')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="display-5 fw-bold text-white">{show.name}</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4 p-2" style={{ backgroundColor: "#fff" }}>
            {show.description}
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button type="button" className="btn btn-primary btn-lg px-4 gap-3">
              Support this show
            </button>
            <button type="button" className="btn btn-outline-light btn-lg px-4">
              Join the Discord chat
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <h3 className="widgetTitle">Last episodes</h3>
            {episodes && episodes.length > 0 ? (
              episodes.map((ep, i) => (
                <div className="card mb-3" style={{ maxWidth: "100%" }} key={i}>
                  <div className="row g-0">
                    <div className="col-md-3">
                      <img
                        src={`../uploads/shows/${ep.image}`}
                        className="img-fluid rounded-start"
                        alt="..."
                        width="200"
                        height="200"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{ep.title}</h5>
                        <p className="card-text">
                          {ep.associated_artists ? (
                            <>Invité.e.s: {ep.associated_artists}</>
                          ) : (
                            <>No guest.s for this show.</>
                          )}
                        </p>
                        <audio className="js-player" controls>
                          <source src={ep.streamUrl} />
                        </audio>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No episodes for this show.</div>
            )}
          </div>
          <div className="col-lg-4">
            <h4 className="widgetTitle">Show Informations</h4>
            {info ? (
              <div>
                <div>Next episode: {info.next_day}</div>
                <div>Hosted by: {info.curator}</div>
                <div>
                  All {info.scheduleDay}s, {info.scheduleTime} {info.timezone}
                </div>
              </div>
            ) : (
              <div>No longer online.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleShow;
