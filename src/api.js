export function getArticles() {
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
}

export function getArticleById(id) {
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
}

export function getCommentsOnArticle(id) {
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
}
