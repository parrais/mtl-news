import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  const {
    author,
    title,
    article_id,
    topic,
    created_at,
    votes,
    article_img_url,
    comment_count,
  } = article;
  const readableDate = new Date(created_at).toString().slice(0, 21);
  return (
    <li className="article-card">
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
      <p>
        <Link to={`/articles/${article_id}`}>Read article</Link>
      </p>
    </li>
  );
};

export default ArticleCard;
