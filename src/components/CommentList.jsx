import { useEffect, useState } from "react";
import { getCommentsOnArticle } from "../api";

import CommentCard from "./CommentCard";

const CommentList = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    console.log("CommentList useEffect called");
    setIsLoading(true);
    setIsError(false);
    console.log("getCommentsOnArticle called");
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
      <section>
        <p>No comments found</p>
      </section>
    );
  }

  if (comments.length > 0) {
    return (
      <ul className="comment-list">
        {comments.map((comment) => {
          return <CommentCard key={comment.comment_id} comment={comment} />;
        })}
      </ul>
    );
  }
};

export default CommentList;
