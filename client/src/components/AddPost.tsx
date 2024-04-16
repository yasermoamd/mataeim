import React, { useState } from 'react';
import { IPost, usePostStore } from '../app/store/postStore';
import { v4 as uuidv4 } from "uuid";

interface AddPostProps {
  postId?: string;
}

export const AddPostComponent: React.FC<AddPostProps> = ({
  postId
}) => {
    const [post, setPost ] = useState<string>('');
  const { addPost } = usePostStore((state) => ({
    addPost: state.addPost,
  }));

  const handleAddPost = () => {
    if (post?.trim() !== '') {
      const newPost: IPost = { content: post, id: uuidv4() };
      addPost(newPost);
      setPost('');
    }
  };
    
  return (
    <div className='w-[18rem] flex flex-col my-8' key={postId}>
    <div className="border border-gray-300 rounded-md px-4 py-2" key={postId}>
    <textarea
      value={post}
      onChange={(e) => setPost(e.target.value)}
      placeholder="What's on your mind?"
      className="w-full h-auto resize-none overflow-hidden outline-none text-gray-700"
    />
   </div>
      <button onClick={handleAddPost} 
      className='w-20 mt-4 rounded-md bg-sky-500 p-2' type="submit">
        addPost</button>
    </div>
  )
}