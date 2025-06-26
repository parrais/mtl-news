import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section id="unknown-route">
      <h2>Unknown page</h2>
      <p>This page does not exist!</p>
      <h3>
        <Link to={`/`}>Go back to the home page</Link>
      </h3>
    </section>
  );
};

export default ErrorPage;
