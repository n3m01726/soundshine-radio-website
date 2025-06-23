import React from "react";

function Home() {
  return (
    <main style={{ margin: "120px 0 0 0" }}>
      <div className="container widget">
        <div className="row">
          <div className="col-lg gx-5">
            <div className="row mt-2">
              <h3 className="p-3">News / Blogs</h3>
            </div>
            {/* News/blogs */}
            <div>{/* <NewsList /> */}À brancher sur l'API posts</div>
            <div className="row mt-2">
              <h3 className="p-3">Last played songs</h3>
            </div>
            {/* Last played songs */}
            <div>{/* <LastPlayedSongs /> */}À brancher sur l'API</div>
            <div className="row mt-2">
              <h3 className="p-3">Top Charts</h3>
            </div>
            {/* Top Charts */}
            <div>{/* <TopCharts /> */}À brancher sur l'API</div>
          </div>
          <div className="col-lg-6">
            <div className="row mt-2">
              <h3 className="p-3">Requests</h3>
            </div>
            {/* Requests */}
            <div>{/* <Requests /> */}À brancher sur l'API</div>
            <div className="row mt-2">
              <h3 className="p-3">Shows Live</h3>
            </div>
            {/* Shows Live */}
            <div>{/* <ShowsLive /> */}À brancher sur l'API</div>
            <div className="row mt-2">
              <h3 className="p-3">Events</h3>
            </div>
            {/* Events */}
            <div>{/* <Events /> */}À brancher sur l'API</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
