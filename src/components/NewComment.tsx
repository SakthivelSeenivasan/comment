import { useState } from "react";
import useCommentTree from "../hooks/useCommentTree";
import Comment from "./Comments";

interface dataItems {
  id: number;
  contents: string;
  createdDate: string;
  updatedDate: string;
  vote: number;
  reply: Array<object>;
}

const NewComment = ({ comments }: { comments: Array<dataItems> }) => {
  const [comment, setComment] = useState<string>("");
  const { comments: commentData, insertComment } = useCommentTree(comments);
  const handleReply = () => {};
  const handleSubmit = () => {
    insertComment(undefined, comment);
  };

  return (
    <>
      <div className="newComment">
        <textarea
          cols={100}
          rows={10}
          value={comment}
          placeholder="Enter your comment here..."
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      {commentData.map((comment: any) => (
        <Comment
          key={comment.id}
          comments={comment}
          onSumitComment={() => {
            handleReply;
          }}
        />
      ))}
    </>
  );
};

export default NewComment;
