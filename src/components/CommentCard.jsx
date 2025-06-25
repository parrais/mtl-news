import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const CommentCard = ({ comment }) => {
  const { username } = useContext(UserContext);
  const { comment_id, votes, created_at, author, body, article_id } = comment;
  const readableDate = new Date(created_at).toString().slice(0, 21);

  return (
    <li className="comment-card">
      <p>{body}</p>
      <p>By: {author}</p>
      <p>{readableDate}</p>
      <p>Votes: {votes}</p>
      <p className={author !== username ? "hidden-paragraph" : ""}>
        {/* <DeleteComment></DeleteComment> (Delete comment placeholder) */}
      </p>
    </li>
  );
};

export default CommentCard;
