import { API, graphqlOperation } from "aws-amplify";
import { createBook } from "../graphql/mutations";
import { listBooks } from "../graphql/queries";

export const createBookFunc = async (bookTitle, authorId = null) => {
  if (!bookTitle) return console.log("No Book Inputed");
  let bookParams = {
    input: {
      title: authorId,
    },
  };

  if (authorId) {
    bookParams = {
      input: {
        title: bookTitle,
        authorBooksId: authorId,
      },
    };
  }
  const result = await API.graphql(graphqlOperation(createBook, bookParams));

  return result.data.createBook;
};

export const listBooksByAuthor = async (authorId) => {
  try {
    const result = await API.graphql(listBooks, {
      filter: { authorBooksId: { eq: authorId } },
    });
    return result.data.listBooks.items;
  } catch (err) {
    console.log("there is an error", err);
  }
};
