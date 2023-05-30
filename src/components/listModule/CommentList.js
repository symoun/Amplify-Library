import React from "react";
import styles from "./CommentList.module.scss";
import { useState } from "react";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose} />;
};

const AddComment = (props) => {
  const [value, setValue] = useState("");

  const changeHandler = (event) => {
    setValue(event.target.default);
  };
  return (
    <li>
      <p>Add Comment:</p>
      <form>
        <textarea
          rows="8"
          cols="15"
          onChange={changeHandler}
          value={value}
        ></textarea>
      </form>
      <button clasName={styles.closecomment} onClick={props.onClose}>
        X
      </button>
    </li>
  );
};

const ListItem = (props) => {
  console.log("Calling from ListItem", props.item);
  return <li>{props.item.content}</li>;
};

const CommentList = (props) => {
  const [showAddComment, setShowAddComment] = useState(false);
  const clickCloseHandler = () => {
    setShowAddComment(false);
  };
  const clickAddHandler = () => {
    setShowAddComment(true);
  };

  return (
    <React.Fragment>
      <Backdrop onClose={props.onClose} />
      <ul className={styles.ul}>
        {props.list.map((item) => {
          return <ListItem key={item.id} item={item} />;
        })}
        {showAddComment && <AddComment onClose={clickCloseHandler} />}
      </ul>
      <button className={styles["btn-add"]} onClick={clickAddHandler}>
        Add Comment
      </button>
    </React.Fragment>
  );
};

export default CommentList;
