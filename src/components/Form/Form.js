import Card from "../Card";
import Modal from "../modalForm/Modal";
import styles from "./Form.module.scss";
import { useState } from "react";
import { createAuthorFunc, getAuthorFunc } from "../../functions/AuthorFunc";
import { createBookFunc } from "../../functions/BookFunc";
import { createCommentFunc } from "../../functions/CommentFunc";

/* const authorReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { name: action.val, isValid: true };
  }

  return { name: state.name, isValid: state.isValid };
};
const bookReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { name: action.val, isValid: true };
  }

  return { name: state.title, isValid: state.isValid };
}; */

const Form = (props) => {
  const [authorName, setAuthorName] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [commentContent, setCommentContent] = useState("");

  const authorChangeHandler = (event) => {
    setAuthorName(event.target.value);
  };
  const bookChangeHandler = (event) => {
    setBookTitle(event.target.value);
  };

  const commentChangeHandler = (event) => {
    setCommentContent(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const authorResult = await createAuthorFunc(authorName);
    const bookResult = await createBookFunc(bookTitle, authorResult.id);
    await createCommentFunc(commentContent, bookResult.id);
    const data = await getAuthorFunc(authorResult.id);
    setAuthorName("");
    setBookTitle("");
    setCommentContent("");

    props.addToList(data);
    props.onCloseSubmit();
  };

  return (
    <Modal>
      <Card className={styles.center}>
        <form onSubmit={submitHandler} className={styles.form}>
          <label htmlFor="author">Author Name:</label>
          <input
            name="author"
            id="author"
            type="text"
            onChange={authorChangeHandler}
            value={authorName}
          />

          <label htmlFor="book">Book Name</label>
          <input
            name="book"
            id="book"
            type="text"
            onChange={bookChangeHandler}
            value={bookTitle}
          />
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            rows="5"
            cols=" 50"
            onChange={commentChangeHandler}
            value={commentContent}
          ></textarea>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button type="submit">Add</button>
        </form>
      </Card>
    </Modal>
  );
};

export default Form;
