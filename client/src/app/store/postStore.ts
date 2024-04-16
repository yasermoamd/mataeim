import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export interface IPost {
    id?: string;
    content: string;
}

interface IPostStore {
    posts: IPost[];
    addPost: (post: IPost) => void;
    updatePost: (post: IPost) => void;
    removePost: (id: string) => void;
}

export const usePostStore = create<IPostStore>((set) => ({
    posts: [],
    addPost: (post) => set((state) => ({ id: uuidv4(), posts: [...state.posts, post] })),
    updatePost: (post) => set((state) => ({ posts: state.posts.map((p) => p.id === post.id ? post : p) })),
    removePost: (id) => set((state) => ({ posts: state.posts.filter((p) => p.id !== id) })),
}));