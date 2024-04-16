import React, { useState } from "react";
import { IPost } from "../app/store/postStore";

interface UpdatePostProps {
  post: IPost;
  postId: string;
  onUpdate: (updatedPost: IPost) => void;
  onCancel: () => void;
}

export const UpdatePostComponent: React.FC<UpdatePostProps> = ({
  post,
  postId,
  onUpdate,
  onCancel,
}) => {
  const [updatedPost, setUpdatedPost] = useState(post.content);

  const handleUpdate = () => {
    if (updatedPost.trim() !== "") {
      const updatedPostObject: IPost = { ...post, content: updatedPost };
      onUpdate(updatedPostObject);
    }
  };

  return (
    <div className="w-[18rem] flex flex-col" key={postId}>
      <div className="border border-gray-300 rounded-md px-4 py-2" key={postId}>
        <textarea
          value={updatedPost}
          onChange={(e) => setUpdatedPost(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full h-auto resize-none overflow-hidden outline-none text-gray-700"
        />
      </div>
      <button
        onClick={handleUpdate}
        className="w-40 mt-4 rounded-md bg-sky-500 p-2"
        type="submit"
      >
        Update Post
      </button>
      <button
        onClick={onCancel}
        className="w-20 mt-2 rounded-md bg-gray-200 p-2"
        type="button"
      >
        Cancel
      </button>
    </div>
  );
};