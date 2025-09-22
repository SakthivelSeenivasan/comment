/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

const useCommentTree = (initialComment: any) => {
  const [comments, setComments] = useState(initialComment);

  const insertNode = (tree: any, commentId: any, content: any) => {
    return tree.map((comment: any) => {
      if (commentId === comment.id) {
        return { ...comment.reply, content };
      } else if (comment.reply && comment.reply.length > 0) {
        return {
          ...comment,
          reply: insertNode(comment.reply, commentId, content),
        };
      }
    });
  };

  const insertComment = (commentId: any = "", contents: any) => {
    const newComment = {
      id: Date.now(),
      vote: 0,
      contents,
      createdDate: new Date().toLocaleDateString,
      updatedDate: new Date().toLocaleDateString,
      reply: [],
    };
    if (commentId) {
      setComments((prevComment: any) =>
        insertNode(prevComment, commentId, contents)
      );
    } else setComments((prev: any) => [newComment, ...prev]);
  };
  return { comments, insertComment };
};

export default useCommentTree;
