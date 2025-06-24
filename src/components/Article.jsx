import { useEffect, useState } from "react";
import { getArticleById } from "../api";
import { useParams } from "react-router-dom";
import CommentList from "./CommentList";

const Article = () => {
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [fullArticle, setFullArticle] = useState(null);
  const [isCommentsFetched, setIsCommentsFetched] = useState(false);
  const [isCommentsShown, setIsCommentsShown] = useState(false);
  const [commentsClasses, setCommentsClasses] = useState(
    "comment-list hidden-comments"
  );

  const toggleComments = () => {
    if (!isCommentsFetched) {
      setIsCommentsFetched(true);
      //Move load of comments to be at this point
    }
    if (!isCommentsShown) {
      setIsCommentsShown(true);
      setCommentsClasses("comment-list");
    } else {
      setIsCommentsShown(false);
      setCommentsClasses("comment-list hidden-comments");
    }
  };

  useEffect(() => {
    console.log("Article useEffect called");
    setIsLoading(true);
    setIsError(false);
    getArticleById(article_id)
      .then((fetchedArticle) => {
        setFullArticle(fetchedArticle);
      })
      .catch((err) => {
        setIsError(true);
        setErrorMessage(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return (
      <section>
        <p>Loading article...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section>
        <p>{errorMessage.msg}</p>
      </section>
    );
  }

  if (fullArticle !== null) {
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
      <>
        <section className="article-section">
          <img
            className="article-thumbnail"
            src={article_img_url}
            alt={`Thumbnail for ${title}`}
          />
          <h2>{title}</h2>
          <p>By: {author}</p>
          <p>Topic: {topic}</p>
          <p>Votes: {votes}</p>
          {/* Upvote/downvote buttons to be added here - optimistic */}
          <p>Comments: {comment_count}</p>
          <p>{readableDate}</p>
          <p>{body}</p>
          <p>
            <button onClick={toggleComments}>
              {isCommentsShown ? "Hide comments" : "Show comments"}
            </button>
          </p>
        </section>
        <section className={commentsClasses}>
          <h2>Comments</h2>
          <CommentList article_id={article_id} />;
          {/* Comments form to be added here */}
        </section>
      </>
    );
  }
};

export default Article;
