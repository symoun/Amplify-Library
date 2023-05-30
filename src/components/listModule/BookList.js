import React from "react";
import styles from "./BookList.module.scss";
import { useState, useEffect } from "react";
import { listComments } from "../../graphql/queries";
import { deleteBook } from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import CommentList from "./CommentList";

const ListItem = (props) => {
  const [commentsByBook, setCommentsByBook] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    listCommentsByBook();
  }, [props.list]);

  const listCommentsByBook = async () => {
    const commentsByBookParams = {
      filter: { bookCommentsId: { eq: props.list.id } },
    };
    const result = await API.graphql(
      graphqlOperation(listComments, commentsByBookParams)
    );
    setCommentsByBook(result.data.listComments.items);
  };

  const viewCommentHandler = () => {
    setShowComments(true);
  };
  const closeCommentHandler = () => {
    setShowComments(false);
  };
  const deleteHandler = async () => {
    const deleteBookByAuthorParams = {
      input: { id: props.list.id },
    };
    await API.graphql(graphqlOperation(deleteBook, deleteBookByAuthorParams));

    props.onDelete(props.list.id);
  };

  return (
    <React.Fragment>
      {showComments && (
        <CommentList list={commentsByBook} onClose={closeCommentHandler} />
      )}
      <li>
        <span>{props.index + 1}</span>
        <span className={styles["book-name"]}> {props.list.title}</span>
        <div>
          <button className={styles["btn-delete"]} onClick={deleteHandler}>
            Delete
          </button>
          <button className={styles["btn-view"]} onClick={viewCommentHandler}>
            View Comments
          </button>
        </div>
      </li>
    </React.Fragment>
  );
};

const BookList = (props) => {
  const deleteHandler = (id) => {
    props.onDelete(id);
  };

  return (
    <ul className={`${props.className} ${styles.ul}`}>
      <h3>Book List</h3>
      {props.list.length > 0 ? (
        props.list.map((item, index) => {
          return (
            <ListItem
              key={item.id}
              index={index}
              list={item}
              onDelete={deleteHandler}
            />
          );
        })
      ) : (
        <p className={styles["no-book"]}>No Books</p>
      )}
    </ul>
  );
};

export default BookList;
