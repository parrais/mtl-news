import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Articles from "./components/Articles";
import Article from "./components/Article";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:article_id" element={<Article />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
