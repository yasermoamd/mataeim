import { create } from "zustand";
import { v4 as uuidv4 } from "uuid"; 
import { IComment } from "./commentStore";

export interface IPost {
    id: string;
    content: string;
    comment?: IComment[];
    likes: number;
}

interface IPostStore {
    posts: IPost[];
    likedPosts: (string | IPost)[];
    addPost: (post: IPost) => void;
    updatePost: (post: IPost) => void;
    removePost: (id: string) => void;
    setPosts: (posts: IPost[]) => void;
    addLikes: (id: string) => void;
}


export const usePostStore = create<IPostStore>((set) => ({
    posts: [],
    likedPosts: [],
    addLikes: (id) => {
        set((state) => {
          // Check if the post has already been liked by the user
          if (state.likedPosts.includes(id)) {
            return state; // Early return if already liked
          }
    
          // Add the id to the likedPosts array
          const updatedLikedPosts = [...state.likedPosts, id];
    
          // Increment likes for the post with the matching id
          const updatedPosts = state.posts.map((post) =>
            post.id === id ? { ...post, likes: (post.likes | 0) + 1 } : post
          );
    
          return { ...state, posts: updatedPosts, likedPosts: updatedLikedPosts };
        });
      },
    addPost: (post) => set((state) => ({ id: uuidv4(), posts: [...state.posts, post] })),
    updatePost: (post) => set((state) => ({ posts: state.posts.map((p) => p.id === post.id ? post : p) })),
    removePost: (id) => set((state) => ({ posts: state.posts.filter((p) => p.id !== id) })),
    setPosts: (posts) => set({ posts }),
}));