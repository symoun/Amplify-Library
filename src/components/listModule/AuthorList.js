import styles from "./AuthorList.module.scss";
import ToggleContainer from "../container/ToggleContainer";
import React from "react";

const AuthorList = (props) => {
  const deleteHandler = (id) => {
    props.onDelete(id);
  };
  const updateNameHandler = (id, name) => {
    props.onUpdateName(id, name);
  };
  const listMap = props.list.map((items, index) => {
    return (
      <li key={items.id}>
        <ToggleContainer
          item={items}
          index={index}
          onDelete={deleteHandler}
          onUpdateName={updateNameHandler}
        />
      </li>
    );
  });

  return (
    <React.Fragment>
      <h2>Author List</h2>
      <ul className={styles.list}>{listMap}</ul>
    </React.Fragment>
  );
};

export default AuthorList;
