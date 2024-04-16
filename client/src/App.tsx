import { useState } from 'react'
import './App.css' 
import { usePostStore } from './app/store/postStore';
import { AddPostComponent } from './components/AddPost';
import { PostListComponent } from './components/PostLists';
import HeaderComponent from './components/HeaderComponent';

export default function App() {
  const  updatePost = usePostStore((state) => state.updatePost);

  const handleUpdatePost = (post: any) => {
    updatePost(post);
  }

  return (
    <div>
      <HeaderComponent />
      <main className='py-4 flex flex-col justify-center items-center '>
        <AddPostComponent />
        <PostListComponent onEditPost={handleUpdatePost} />
      </main>
    </div>
  )
}
