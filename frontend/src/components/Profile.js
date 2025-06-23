import React from "react";

function Profile({ user, posts }) {
  // Données factices pour la démo, à remplacer par un fetch
  const fakeUser = user || {
    nice_nickname: "DJ Soundshine",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    job_title: "Radio Host & Music Producer",
    bio: "Spinning the best tracks and producing fresh beats. Catch my show live!",
    website: "https://soundshine.dev",
    facebook: "djsoundshine",
    twitter: "djsoundshine",
    instagram: "djsoundshine",
    linkedin: "djsoundshine",
    email: "dj@soundshine.dev",
  };

  const fakePosts = posts || [
    {
      id: 1,
      title: "My Top 10 Tracks of the Month",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      id: 2,
      title: "Behind the Scenes of a Live Show",
      content: "Pellentesque habitant morbi tristique senectus et netus...",
    },
  ];

  const projectStatus = [
    { name: "Web Design", progress: "80%" },
    { name: "Website Markup", progress: "72%" },
    { name: "One Page", progress: "89%" },
    { name: "Mobile Template", progress: "55%" },
    { name: "Backend API", progress: "66%" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Colonne de gauche (Profil & Liens) */}
      <div className="md:col-span-1 space-y-8">
        <div className="card text-center">
          <img
            src={fakeUser.avatar}
            alt={fakeUser.nice_nickname}
            className="rounded-full w-36 h-36 mx-auto -mt-20 border-4 border-white shadow-lg"
          />
          <div className="mt-4">
            <h4 className="text-2xl font-bold text-title">
              {fakeUser.nice_nickname}
            </h4>
            <p className="text-gray-500 mb-1">{fakeUser.job_title}</p>
            <p className="text-sm text-gray-600 mb-4">{fakeUser.bio}</p>
            <button className="btn btn-primary w-full">
              Message me on Discord
            </button>
          </div>
        </div>
        <div className="card">
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <h6 className="font-semibold text-gray-700">Website:</h6>
              <span className="text-gray-500 text-right">
                {fakeUser.website}
              </span>
            </li>
            <li className="flex justify-between items-center">
              <h6 className="font-semibold text-gray-700">Twitter:</h6>
              <span className="text-gray-500">@{fakeUser.twitter}</span>
            </li>
            <li className="flex justify-between items-center">
              <h6 className="font-semibold text-gray-700">Instagram:</h6>
              <span className="text-gray-500">@{fakeUser.instagram}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Colonne de droite (Infos & Activité) */}
      <div className="md:col-span-2 space-y-8">
        <div className="card">
          <h3 className="text-xl font-bold text-title mb-4">About the DJ</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="font-semibold text-gray-700">Full Name</div>
              <div className="col-span-2 text-gray-500">
                {fakeUser.nice_nickname}
              </div>
            </div>
            <hr />
            <div className="grid grid-cols-3 gap-2">
              <div className="font-semibold text-gray-700">Email</div>
              <div className="col-span-2 text-gray-500">{fakeUser.email}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="text-xl font-bold text-title mb-4">
              Published Articles
            </h3>
            <div className="space-y-4">
              {fakePosts.length > 0 ? (
                fakePosts.map((post) => (
                  <div key={post.id}>
                    <a
                      href={`/post/${post.id}`}
                      className="font-semibold text-link hover:underline"
                    >
                      {post.title}
                    </a>
                    <p className="text-sm text-gray-600 mt-1">
                      {post.content.slice(0, 80)}...
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Nothing found.</p>
              )}
            </div>
          </div>
          <div className="card">
            <h3 className="text-xl font-bold text-title mb-4">
              Project Status
            </h3>
            <div className="space-y-4">
              {projectStatus.map((project) => (
                <div key={project.name}>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    {project.name}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-accent-red h-2.5 rounded-full"
                      style={{ width: project.progress }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
