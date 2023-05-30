import React from "react";
import { useState, useEffect } from "react";
import downIcon from "../../svg/down-arrow-backup-2-svgrepo-com.svg";
import upIcon from "../../svg/up-arrow-backup-3-svgrepo-com.svg";
import styles from "./ToggleContainer.module.scss";
import BookList from "../listModule/BookList";
import { API, graphqlOperation } from "aws-amplify";
import { listBooks } from "../../graphql/queries";
import { deleteAuthor, updateAuthor } from "../../graphql/mutations";
import AddForm from "../Form/AddForm";
import { createBookFunc } from "../../functions/BookFunc";

const ToggleContainer = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const [showUpdateNameForm, setShowUpdateNameForm] = useState(false);
  const [booksByAuthor, setBooksByAuthor] = useState([]);

  useEffect(() => {
    listBooksByAuthor(props.item.id);
  }, [props.item]);

  const listBooksByAuthor = async (authorId) => {
    const booksByAuthorParams = {
      filter: {
        authorBooksId: { eq: authorId },
      },
    };

    const result = await API.graphql(
      graphqlOperation(listBooks, booksByAuthorParams)
    );
    const data = result.data.listBooks.items;
    setBooksByAuthor(data);
    return data;
  };
  const clickShowHandler = () => {
    setIsActive(() => {
      return !isActive;
    });
  };

  const clickDeleteHandler = async () => {
    const deleteAuthorParams = {
      input: { id: props.item.id },
    };
    await API.graphql(graphqlOperation(deleteAuthor, deleteAuthorParams));

    props.onDelete(props.item.id);
  };
  const showAddBookFormHandler = () => {
    setShowAddBookForm(true);
  };

  const closeAddBookFormHandler = () => {
    setShowAddBookForm(false);
  };

  const submitBookHandler = async (value) => {
    const data = await createBookFunc(value, props.item.id);
    setBooksByAuthor((prevState) => {
      return [...prevState, data];
    });
    closeAddBookFormHandler();
  };

  const submitUpdateNameHandler = async (name) => {
    const updateAuthorParams = {
      input: { id: props.item.id, name: name },
    };
    await API.graphql(graphqlOperation(updateAuthor, updateAuthorParams));
    props.onUpdateName(props.item.id, name);
    setShowUpdateNameForm(false);
  };
  const cancelUpdateNameHandler = () => {
    setShowUpdateNameForm(false);
  };
  const showUpdateNameFormHandler = () => {
    setShowUpdateNameForm(true);
  };
  const deleteBookHandler = (id) => {
    setBooksByAuthor((prevState) => {
      return prevState.filter((item) => {
        return item.id !== id;
      });
    });
  };

  return (
    <React.Fragment>
      {showAddBookForm && (
        <AddForm
          header="Add Books"
          name="Book Name"
          onCancel={closeAddBookFormHandler}
          onSubmitForm={submitBookHandler}
        />
      )}
      {showUpdateNameForm && (
        <AddForm
          header="Change Author Name"
          name="New Author Name"
          onCancel={cancelUpdateNameHandler}
          onSubmitForm={submitUpdateNameHandler}
        />
      )}
      <div className={styles.index}>{props.index + 1}</div>
      <div className={styles.author}>
        <span> {props.item.name}</span>
      </div>
      <div className={styles["btn-container"]}>
        <button
          className={`${styles.deletebutton} ${styles["btn-mutate"]}`}
          onClick={clickDeleteHandler}
        >
          Delete Author
        </button>
        <button
          className={`${styles.addbutton} ${styles["btn-mutate"]}`}
          onClick={showAddBookFormHandler}
        >
          Add Book
        </button>
        <button
          className={`${styles.updatebutton} ${styles["btn-mutate"]}`}
          onClick={showUpdateNameFormHandler}
        >
          Update Name
        </button>
      </div>
      <button
        className={`${styles.button} ${props.className}`}
        onClick={clickShowHandler}
      >
        <img src={!isActive ? downIcon : upIcon} alt="and icon that has" />
      </button>
      {isActive && (
        <BookList
          list={booksByAuthor}
          className={styles.booklist}
          onDelete={deleteBookHandler}
        />
      )}
    </React.Fragment>
  );
};

export default ToggleContainer;
