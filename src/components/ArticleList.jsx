import { useEffect, useState } from "react";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";

const ArticleList = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  let sortBy = searchParams.get("sort_by") || "created_at";
  let order = searchParams.get("order") || "desc";
  let topic = slug || "";

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSortByChange = (e) => {
    setSearchParams({ sort_by: e.target.value, order: order });
  };
  const handleOrderChange = (e) => {
    setSearchParams({ sort_by: sortBy, order: e.target.value });
  };

  useEffect(() => {
    console.log("ArticleList useEffect called");
    setIsLoading(true);
    setIsError(false);
    getArticles({ sortBy, order, topic })
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
  }, [sortBy, order]);

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
      <>
        <form>
          <label>
            Sort articles{" "}
            <select value={sortBy} onChange={handleSortByChange}>
              <option value="created_at">Date</option>
              <option value="comment_count">Comments</option>
              <option value="votes">Votes</option>
            </select>{" "}
            <select value={order} onChange={handleOrderChange}>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </label>
        </form>
        <ul className="article-list">
          {articles.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />;
          })}
        </ul>
      </>
    );
  }
};

export default ArticleList;
