import { Link } from "react-router-dom";
import TopicList from "./TopicList";

const Home = () => {
  return (
    <>
      <section id="intro">
        <h2>Welcome to our Community</h2>
        <p>
          This site hosts articles that have been posted by authors within our
          community; please feel free to read, comment, and vote for your
          favourites!
        </p>
      </section>
      <section id="home-navigation">
        <h2>
          <Link to={`/articles`}>See All Articles</Link>
          <br />
          Or Choose a Topic:
        </h2>
        <TopicList />
      </section>
    </>
  );
};

export default Home;
