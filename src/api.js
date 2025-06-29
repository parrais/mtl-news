export const getArticles = (query) => {
  const { sortBy, order, topic } = query;
  return fetch(
    `https://mtl-news-backend.onrender.com/api/articles?sort_by=${sortBy}&order=${order}&topic=${topic}`
  ).then((res) => {
    if (!res.ok) {
      if (res.status === 404) {
        return Promise.reject({
          status: res.status,
          msg: "No matching articles found",
        });
      }
      return Promise.reject({
        status: res.status,
        msg: "Unable to fetch article list",
      });
    }
    return res.json();
  });
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
          msg: "Unable to fetch article",
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
        msg: "Unable to fetch comments",
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
        msg: "Unable to submit vote",
      });
    }
    return res.json();
  });
};

export const addCommentToArticle = (id, user, commentContent) => {
  const commentBody = { author: user, body: commentContent };
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
        msg: "Unable to submit comment",
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
      return Promise.reject({
        status: res.status,
        msg: "Unable to delete comment",
      });
    }
  });
};

export const getTopics = () => {
  return fetch(`https://mtl-news-backend.onrender.com/api/topics`).then(
    (res) => {
      if (!res.ok) {
        return Promise.reject({
          status: res.status,
          msg: "Unable to fetch topic list",
        });
      }
      return res.json();
    }
  );
};
