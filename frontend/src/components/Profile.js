import React from "react";

function Profile({ user, posts }) {
  // user et posts peuvent être passés en props ou récupérés via un fetch dans un useEffect
  // Ici, structure statique, à brancher dynamiquement ensuite
  return (
    <section>
      <div className="container">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={user?.avatar || "../uploads/profile/default.png"}
                      alt={user?.username}
                      className="rounded-circle"
                      width="150"
                    />
                    <div className="mt-3">
                      <h4>{user?.nice_nickname}</h4>
                      <p className="text-secondary mb-1">{user?.job_title}</p>
                      <p className="text-secondary mb-3">{user?.bio}</p>
                      <button className="btn btn-outline-dark">
                        Message me on discord
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-3">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Website:</h6>
                    <span className="text-secondary">https://yoursite.com</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Facebook:</h6>
                    <span className="text-secondary">{user?.facebook}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Twitter:</h6>
                    <span className="text-secondary">@{user?.twitter}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Instagram:</h6>
                    <span className="text-secondary">{user?.instagram}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Linkedin:</h6>
                    <span className="text-secondary">{user?.linkedin}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-header">About the DJ</div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user?.nice_nickname}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{user?.email}</div>
                  </div>
                </div>
              </div>
              <div className="row gutters-sm">
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-header">Published Articles</div>
                    <div className="card-body">
                      {posts && posts.length > 0 ? (
                        posts.map((post) => (
                          <div key={post.id}>
                            <small>
                              <a
                                style={{ textDecoration: "underline" }}
                                href={"/post/" + post.id}
                              >
                                {post.title}
                              </a>
                            </small>
                            <div className="mb-4">
                              <small>{post.content?.slice(0, 100)}...</small>
                            </div>
                            <hr />
                          </div>
                        ))
                      ) : (
                        <div>Nothing found.</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-header">Project Status</div>
                    <div className="card-body">
                      <small>Web Design</small>
                      <div className="progress mb-3" style={{ height: 5 }}>
                        <div
                          className="progress-bar bg-dark"
                          role="progressbar"
                          style={{ width: "80%" }}
                        ></div>
                      </div>
                      <small>Website Markup</small>
                      <div className="progress mb-3" style={{ height: 5 }}>
                        <div
                          className="progress-bar bg-dark"
                          role="progressbar"
                          style={{ width: "72%" }}
                        ></div>
                      </div>
                      <small>One Page</small>
                      <div className="progress mb-3" style={{ height: 5 }}>
                        <div
                          className="progress-bar bg-dark"
                          role="progressbar"
                          style={{ width: "89%" }}
                        ></div>
                      </div>
                      <small>Mobile Template</small>
                      <div className="progress mb-3" style={{ height: 5 }}>
                        <div
                          className="progress-bar bg-dark"
                          role="progressbar"
                          style={{ width: "55%" }}
                        ></div>
                      </div>
                      <small>Backend API</small>
                      <div className="progress mb-3" style={{ height: 5 }}>
                        <div
                          className="progress-bar bg-dark"
                          role="progressbar"
                          style={{ width: "66%" }}
                        ></div>
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

export default Profile;
