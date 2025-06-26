import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Articles from "./components/Articles";
import Article from "./components/Article";
import Topics from "./components/Topics";
import Topic from "./components/Topic";
import Home from "./components/Home";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:slug" element={<Topic />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:article_id" element={<Article />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
