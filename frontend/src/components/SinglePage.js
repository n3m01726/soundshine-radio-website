import React from "react";

function SinglePage({ post }) {
  if (!post) return <div>Chargement...</div>;
  return (
    <>
      <div
        className="posts-img"
        style={{
          backgroundImage: `url('uploads/posts/${post.featured_image}')`,
          paddingTop: "15%",
        }}
      >
        <h3 className="text-center post-title">
          <b>{post.title}</b>
        </h3>
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

export default SinglePage;
