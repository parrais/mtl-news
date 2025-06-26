import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { deleteCommentById } from "../api";

const CommentCard = ({ comment }) => {
  const { username } = useContext(UserContext);
  const { comment_id, votes, created_at, author, body, article_id } = comment;
  const readableDate = new Date(created_at).toString().slice(0, 21);
  const [commentClasses, setCommentClasses] = useState("comment-card");
  const [statusComment, setStatusComment] = useState("");

  const handleDeleteClick = () => {
    setStatusComment("Deleting comment...");
    deleteCommentById(comment_id)
      .then((response) => {
        setCommentClasses("comment-card hidden-card");
        setStatusComment("Comment deleted");
      })
      .catch((error) => {
        setStatusComment("Deletion failed");
      });
  };

  return (
    <li className={commentClasses} id={`comment-${comment_id}`}>
      <p>{body}</p>
      <p>By: {author}</p>
      <p>{readableDate}</p>
      <p>Votes: {votes}</p>
      <p className={author !== username ? "hidden-paragraph" : ""}>
        <button onClick={handleDeleteClick}>Delete comment</button>{" "}
        <span>{statusComment}</span>
      </p>
    </li>
  );
};

export default CommentCard;
