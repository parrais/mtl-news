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
        return Promise.reject({
          status: res.status,
          msg: "Failed to fetch article",
        });
      }
      return res.json();
    }
  );
}
