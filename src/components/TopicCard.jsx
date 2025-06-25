import { Link } from "react-router-dom";

const TopicCard = ({ topic }) => {
  const { slug, description } = topic;
  return (
    <li className="topic-card">
      <h3>
        <Link to={`/topics/${slug}`}>{slug}</Link>
      </h3>
      <p>{description}</p>
    </li>
  );
};

export default TopicCard;
