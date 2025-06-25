import ArticleList from "./ArticleList";
import { useParams } from "react-router-dom";

const Topic = () => {
  const { slug } = useParams();
  return (
    <section>
      <h2>Articles on {slug}</h2>
      <ArticleList slug={slug} />
    </section>
  );
};

export default Topic;
