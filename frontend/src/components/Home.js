import React from "react";

function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Colonne principale (2/3) */}
      <div className="lg:col-span-2 space-y-8">
        <div className="card">
          <h3 className="text-2xl font-bold text-title mb-4">News / Blogs</h3>
          <div className="text-gray-500">
            {/* <NewsList /> */}À brancher sur l'API posts...
          </div>
        </div>

        <div className="card">
          <h3 className="text-2xl font-bold text-title mb-4">
            Last played songs
          </h3>
          <div className="text-gray-500">
            {/* <LastPlayedSongs /> */}À brancher sur l'API...
          </div>
        </div>

        <div className="card">
          <h3 className="text-2xl font-bold text-title mb-4">Top Charts</h3>
          <div className="text-gray-500">
            {/* <TopCharts /> */}À brancher sur l'API...
          </div>
        </div>
      </div>

      {/* Colonne latérale (1/3) */}
      <div className="space-y-8">
        <div className="card">
          <h3 className="text-2xl font-bold text-title mb-4">Requests</h3>
          <div className="text-gray-500">
            {/* <Requests /> */}À brancher sur l'API...
          </div>
        </div>

        <div className="card">
          <h3 className="text-2xl font-bold text-title mb-4">Shows Live</h3>
          <div className="text-gray-500">
            {/* <ShowsLive /> */}À brancher sur l'API...
          </div>
        </div>

        <div className="card">
          <h3 className="text-2xl font-bold text-title mb-4">Events</h3>
          <div className="text-gray-500">
            {/* <Events /> */}À brancher sur l'API...
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
