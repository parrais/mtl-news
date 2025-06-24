const CommentCard = ({ comment }) => {
  const { comment_id, votes, created_at, author, body, article_id } = comment;
  const readableDate = new Date(created_at).toString().slice(0, 21);
  return (
    <li className="comment-card">
      <p>{body}</p>
      <p>By: {author}</p>
      <p>{readableDate}</p>
      <p>Votes: {votes}</p>
    </li>
  );
};

export default CommentCard;
