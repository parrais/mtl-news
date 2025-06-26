import { useEffect, useState } from "react";
import { getCommentsOnArticle } from "../api";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

const CommentList = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    console.log("CommentList useEffect called");
    setIsLoading(true);
    setIsError(false);
    getCommentsOnArticle(article_id)
      .then((fetchedComments) => {
        setComments(fetchedComments.comments);
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
        <p>Loading comments...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section>
        <p>Unable to load comments</p>
      </section>
    );
  }

  if (comments.length === 0) {
    return (
      <section className="comment-area">
        <section className="new-comment-form">
          <CommentForm article_id={article_id} />
        </section>
        <section className="comment-list-area">
          <p>No comments found</p>
        </section>
      </section>
    );
  }

  if (comments.length > 0) {
    return (
      <section className="comment-area">
        <section className="new-comment-form">
          <CommentForm
            article_id={article_id}
            comments={comments}
            setComments={setComments}
          />
        </section>
        <section className="comment-list-area">
          <ul className="comment-list">
            {comments.map((comment) => {
              return <CommentCard key={comment.comment_id} comment={comment} />;
            })}
          </ul>
        </section>
      </section>
    );
  }
};

export default CommentList;
