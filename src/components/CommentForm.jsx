import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { addCommentToArticle } from "../api";

const CommentForm = ({ article_id, comments, setComments }) => {
  const [commentInput, setCommentInput] = useState("");
  const { username } = useContext(UserContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [statusComment, setStatusComment] = useState("");

  const handleChange = (e) => {
    setCommentInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusComment("Submitting comment...");
    addCommentToArticle(article_id, username, commentInput)
      .then((response) => {
        const updatedComments = [response.newComment, ...comments];
        setIsSubmitted(true);
        setStatusComment("Comment added");
        setCommentInput("");
        setComments(updatedComments);
      })
      .catch((err) => {
        setStatusComment("Submission failed");
      });
  };

  return (
    <>
      <h3>New comment</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment-input">Enter comment: </label>
        <input
          type="text"
          onChange={handleChange}
          value={commentInput}
          required
        />{" "}
        <button
          type="submit"
          className="add-comment-button"
          disabled={isSubmitted}
        >
          Add Comment
        </button>{" "}
        <span>{statusComment}</span>
      </form>
    </>
  );
};

export default CommentForm;
