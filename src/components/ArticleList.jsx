import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";

const ArticleList = ({ slug }) => {
  let query = "";
  if (typeof slug === "string") {
    query = `?topic=${slug}`;
  }
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log("ArticleList useEffect called");
    setIsLoading(true);
    setIsError(false);
    getArticles(query)
      .then((fetchedArticles) => {
        setArticles(fetchedArticles.articles);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setErrorMessage(err);
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
        <p>{errorMessage.msg}</p>
        <h3>
          <Link to={`/`}>Go back to the home page</Link>
        </h3>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section>
        <p>No articles found</p>
        <h3>
          <Link to={`/`}>Go back to the home page</Link>
        </h3>
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
