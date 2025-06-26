import { useEffect, useState } from "react";
import { getArticleById, addVotesToArticle } from "../api";
import { useParams, Link } from "react-router-dom";
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
  const [hasVoted, setHasVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(0);
  const [voteError, setVoteError] = useState(null);

  const toggleComments = () => {
    if (!isCommentsFetched) {
      setIsCommentsFetched(true);
    }
    if (!isCommentsShown) {
      setIsCommentsShown(true);
      setCommentsClasses("comment-list");
    } else {
      setIsCommentsShown(false);
      setCommentsClasses("comment-list hidden-comments");
    }
  };

  const handleUpVote = () => {
    handleVote(1);
  };

  const handleDownVote = () => {
    handleVote(-1);
  };

  const handleVote = (input) => {
    setHasVoted(true);
    setVoteCount((currentVotes) => currentVotes + input);
    setVoteError(null);
    addVotesToArticle(article_id, input).catch((err) => {
      setVoteCount((currentVotes) => currentVotes - input);
      setHasVoted(false);
      setVoteError("Your vote was not successful. Please try again!");
    });
  };

  useEffect(() => {
    console.log("Article useEffect called");
    setIsLoading(true);
    setIsError(false);
    getArticleById(article_id)
      .then((fetchedArticle) => {
        setVoteCount(fetchedArticle.article.votes);
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
        <h2>Error displaying article</h2>
        <p>{errorMessage.msg}</p>
        <h3>
          <Link to={`/`}>Go back to the home page</Link>
        </h3>
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
          <p>
            Votes:{" "}
            <button onClick={handleDownVote} disabled={hasVoted}>
              -1
            </button>{" "}
            {voteCount}{" "}
            <button onClick={handleUpVote} disabled={hasVoted}>
              +1
            </button>{" "}
            {voteError}
          </p>
          <p>Comments: {comment_count}</p>
          <p>{readableDate}</p>
          <p>{body}</p>
          <p>
            <button onClick={toggleComments}>
              {isCommentsShown ? "Hide comments" : "Show comments"}
            </button>
          </p>
        </section>
        {!isCommentsFetched ? null : (
          <section className={commentsClasses}>
            <h2>Comments</h2>
            <CommentList article_id={article_id} />
          </section>
        )}
      </>
    );
  }
};

export default Article;
