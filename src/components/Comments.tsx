import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface dataItems {
  id: number;
  contents: string;
  reply: Array<object>;
  createdDate: string;
  updatedDate: string;
  vote: number;
}

const Comment = ({
  key,
  comments,
  onSumitComment,
}: {
  comments: dataItems;
  key: number;
  onSumitComment: () => void;
}) => {
  const [expand, setExpand] = useState(false);

  return (
    <div key={key} className="comments">
      <div>{comments.contents}</div>
      <div>{new Date().toLocaleDateString()}</div>
      <div>Vote: {comments.vote}</div>
      <div className="replyGroup">
        <button type="button" onClick={() => setExpand((prev) => !prev)}>
          {expand ? "Hide Reply" : "Reply"}
        </button>
        <button type="button">Edit</button>
        <button type="button">Delete</button>
        <button type="button">
          <FontAwesomeIcon icon={faThumbsUp} />
        </button>
        <button type="button">
          <FontAwesomeIcon icon={faThumbsDown} />
        </button>
      </div>
      {expand && (
        <>
          <div className="newComment">
            <textarea cols={100} rows={10} value={""} />
            <button type="button">Submit</button>
          </div>
          <div>
            {comments?.reply?.map((item: any) => (
              <Comment
                comments={item}
                onSumitComment={() => onSumitComment}
                key={item.id}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Comment;
