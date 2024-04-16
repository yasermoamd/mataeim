import React, { useState } from "react";
import { IPost, usePostStore } from "../app/store/postStore";
import { UpdatePostComponent } from "./UpdatePost";

interface PostProps {
  post: IPost;
}

export const PostComponent: React.FC<PostProps> = ({ post }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
 
  const { updatePost, removePost } = usePostStore((state) => ({
    updatePost: state.updatePost,
    removePost: state.removePost,
  }));

  const handleUpdatePost = (updatedPost: IPost) => {
    updatePost(updatedPost);
    setShowEdit(false);
  };

  const handleEditPost = () => {
    setShowOptions(false);
    setShowEdit(true);
  };

  const handleDeletePost = () => {
    // implement delete post
    removePost(post.id!);
  }
  return (
    <>
      {showEdit ? (
        <UpdatePostComponent
            post={post}
            onUpdate={handleUpdatePost}
            onCancel={() => setShowEdit(false)} 
            postId={post.id!}
         />
      ) : (
        <div className="w-[18rem] border p-2" key={post.id}>
          <div className="flex justify-between items-center">
            <div>
              <p className="w-8 h-8 rounded-full bg-gray-800"></p>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => setShowOptions(!showOptions)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="7" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="17" r="2" />
              </svg>
            </div>
            {showOptions && (
              <div className="absolute right-28 top-[17rem] shadow-xl bg-white border p-4">
                <div className="flex flex-col gap-4">
                  <p className="cursor-pointer" onClick={handleEditPost}>
                    Edit
                  </p>
                    <div>
                        <p className="cursor-pointer text-red-500" onClick={handleDeletePost}>Delete</p>
                    </div>
                  <p className="cursor-pointer">Report the post</p>
                </div>
              </div>
            )}
          </div>
          <hr />
          <div className="mt-2">
            <p>{post.content}</p>
          </div>
        </div>
      )}
    </>
  );
};