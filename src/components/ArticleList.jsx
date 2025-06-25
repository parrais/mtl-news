import { useEffect, useState } from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    console.log("ArticleList useEffect called");
    setIsLoading(true);
    setIsError(false);
    console.log("getArticles called");
    getArticles()
      .then((fetchedArticles) => {
        setArticles(fetchedArticles.articles);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading articles...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section>
        <p>Unable to load articles</p>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section>
        <p>No articles found</p>
      </section>
    );
  }

  if (articles.length > 0) {
    return (
      <ul className="article-list">
        {articles.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </ul>
    );
  }
};

export default ArticleList;
