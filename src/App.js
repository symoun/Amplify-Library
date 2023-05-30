import React from "react";
import { useState, useEffect } from "react";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import { listAuthors, listBooks, listComments } from "./graphql/queries";
import AuthorList from "./components/listModule/AuthorList";
import Card from "./components/Card";
import Header from "./components/Header";
import Form from "./components/Form/Form";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const App = () => {
  const [authorsList, setAuthorsList] = useState([]);
  const [formIsShown, setFormIsShown] = useState(false);

  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    try {
      //get author list
      const authorsData = await API.graphql(graphqlOperation(listAuthors));
      const authors = authorsData.data.listAuthors.items;
      setAuthorsList(authors);
    } catch (err) {
      console.log("Error with fetching data");
    }
  };
  const addToListHandler = (item) => {
    setAuthorsList(() => {
      return [...authorsList, item];
    });
  };
  const deleteAuthorHandler = (id) => {
    setAuthorsList((prevState) => {
      return prevState.filter((item) => {
        return item.id !== id;
      });
    });
  };

  const updateNameHandler = (id, name) => {
    console.log(`UpdateNameFrom App.js id:${id} name: ${name}`);
    setAuthorsList((prevState) => {
      const newList = [...prevState];
      for (const item of newList) {
        if (item.id === id) {
          item.name = name;
        }
      }
      return newList;
    });
  };
  const closeFormHandler = () => {
    setFormIsShown(false);
  };
  const showFormHandler = () => {
    setFormIsShown(true);
  };

  return (
    <React.Fragment>
      <Header onAddBook={showFormHandler} />
      {formIsShown && (
        <Form
          addToList={addToListHandler}
          onCancel={closeFormHandler}
          onCloseSubmit={closeFormHandler}
        />
      )}
      <Card>
        {authorsList.length > 0 ? (
          <AuthorList
            list={authorsList}
            onDelete={deleteAuthorHandler}
            onUpdateName={updateNameHandler}
          />
        ) : (
          <p>The Author list is empty. Press Add Author to populate.</p>
        )}
      </Card>
    </React.Fragment>
  );
};

export default App;
