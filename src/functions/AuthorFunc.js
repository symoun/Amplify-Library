import { API, graphqlOperation } from "aws-amplify";
import { createAuthor } from "../graphql/mutations";
import { getAuthor } from "../graphql/queries";

export const createAuthorFunc = async (authorName) => {
  try {
    const authorParams = {
      input: {
        name: authorName,
      },
    };
    const result = await API.graphql(
      graphqlOperation(createAuthor, authorParams)
    );
    return result.data.createAuthor;
  } catch (err) {
    console.log("there is an error", err);
  }
};
export const getAuthorFunc = async (authorId) => {
  try {
    const result = await API.graphql(
      graphqlOperation(getAuthor, { id: authorId })
    );

    return result.data.getAuthor;
  } catch (err) {
    console.log("there is an error", err);
  }
};
