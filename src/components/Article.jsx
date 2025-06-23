import { useEffect, useState } from "react";
import { getArticleById } from "../api";
import { useParams } from "react-router-dom";

const Article = () => {
  const [fullArticle, setFullArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { article_id } = useParams();

  useEffect(() => {
    console.log("Article useEffect called");
    setIsLoading(true);
    setIsError(false);
    getArticleById(article_id)
      .then((fetchedArticle) => {
        setFullArticle(fetchedArticle);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>LOADING...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section>
        <p>ERROR!!</p>
      </section>
    );
  }

  if (fullArticle !== null) {
    console.log(fullArticle);
    const {
      author,
      title,
      article_id,
      body,
      topic,
      created_at,
      votes,
      article_img_url,
      comment_count,
    } = fullArticle.article;
    const readableDate = new Date(created_at).toString().slice(0, 21);
    return (
      <section>
        <img
          className="article-thumbnail"
          src={article_img_url}
          alt={`Thumbnail for ${title}`}
        />
        <h3>{title}</h3>
        <p>By: {author}</p>
        <p>Topic: {topic}</p>
        <p>Votes: {votes}</p>
        <p>Comments: {comment_count}</p>
        <p>{readableDate}</p>
        <p>{body}</p>
      </section>
    );
  }
};

export default Article;
