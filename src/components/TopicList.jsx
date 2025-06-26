import { useEffect, useState } from "react";
import { getTopics } from "../api";
import TopicCard from "./TopicCard";

const TopicList = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    console.log("TopicList useEffect called");
    setIsLoading(true);
    setIsError(false);
    getTopics()
      .then((fetchedTopics) => {
        setTopics(fetchedTopics.topics);
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
        <p>Loading topics...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section>
        <p>Unable to load topics</p>
      </section>
    );
  }

  if (topics.length === 0) {
    return (
      <section>
        <p>No topics found</p>
      </section>
    );
  }

  if (topics.length > 0) {
    return (
      <ul className="topic-list">
        {topics.map((topic) => {
          return <TopicCard key={topic.slug} topic={topic} />;
        })}
      </ul>
    );
  }
};

export default TopicList;
