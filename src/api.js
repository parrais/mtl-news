export const getArticles = () => {
  return fetch(`https://mtl-news-backend.onrender.com/api/articles`).then(
    (res) => {
      if (!res.ok) {
        return Promise.reject({
          status: res.status,
          msg: "Failed to fetch article list",
        });
      }
      return res.json();
    }
  );
};

export const getArticleById = (id) => {
  return fetch(`https://mtl-news-backend.onrender.com/api/articles/${id}`).then(
    (res) => {
      if (!res.ok) {
        if (res.status === 404) {
          return Promise.reject({
            status: res.status,
            msg: `No article found with ID ${id}`,
          });
        }
        return Promise.reject({
          status: res.status,
          msg: "Failed to fetch article",
        });
      }
      return res.json();
    }
  );
};

export const getCommentsOnArticle = (id) => {
  return fetch(
    `https://mtl-news-backend.onrender.com/api/articles/${id}/comments`
  ).then((res) => {
    if (!res.ok) {
      return Promise.reject({
        status: res.status,
        msg: "Failed to fetch comment",
      });
    }
    return res.json();
  });
};

export const addVotesToArticle = (id, newVote) => {
  const voteBody = { inc_votes: newVote };
  return fetch(`https://mtl-news-backend.onrender.com/api/articles/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(voteBody),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject({
        status: res.status,
        msg: "Voting failed",
      });
    }
    return res.json();
  });
};

export const addCommentToArticle = (id, user, commentContent) => {
  const commentBody = { author: user, body: commentContent };
  console.log(id, commentBody);
  return fetch(
    `https://mtl-news-backend.onrender.com/api/articles/${id}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentBody),
    }
  ).then((res) => {
    if (!res.ok) {
      return Promise.reject({
        status: res.status,
        msg: "Comment submission failed",
      });
    }
    return res.json();
  });
};

export const deleteCommentById = (id) => {
  return fetch(`https://mtl-news-backend.onrender.com/api/comments/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      if (res.status === 404) {
        return Promise.reject({
          status: res.status,
          msg: `No comment found with ID ${id}`,
        });
      }
      return Promise.reject({
        status: res.status,
        msg: "Failed to delete comment",
      });
    }
    return res.json();
  });
};
