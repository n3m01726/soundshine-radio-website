import React from "react";

function SingleEvent({ post }) {
  if (!post) return <div>Chargement...</div>;
  return (
    <>
      <div
        className="posts-img"
        style={{
          backgroundImage: `url('/public/uploads/${post.featured_image}')`,
          paddingTop: "15%",
        }}
      >
        <h3 className="text-center post-title">
          <b>{post.title}</b>
        </h3>
      </div>
      <div className="post-meta text-center" style={{ lineHeight: "5rem" }}>
        <span style={{ marginRight: 10 }}>
          <i className="bi bi-calendar3"></i>
          <i
            className="fa-solid fa-calendar-days"
            style={{ marginRight: 10 }}
          ></i>
          {post.date_posted}
        </span>
        <span>
          <i className="bi bi-person-circle"></i>
          {post.nice_nickname}, {post.job_title}
        </span>
      </div>
      <section>
        <div className="container">
          <div className="row">
            <div
              className="col-10 mx-auto post-content"
              style={{ padding: 20 }}
            >
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SingleEvent;
