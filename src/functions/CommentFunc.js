import { API, graphqlOperation } from "aws-amplify";
import { createComment } from "../graphql/mutations";

export const createCommentFunc = async (commentContent, bookId = null) => {
  if (!commentContent) return console.log("No Comment Inputed");
  let commentParams = {
    input: {
      content: commentContent,
    },
  };
  if (bookId) {
    commentParams = {
      input: {
        content: commentContent,
        bookCommentsId: bookId,
      },
    };
  }
  const result = await API.graphql(
    graphqlOperation(createComment, commentParams)
  );

  return result.data.createComment;
};
