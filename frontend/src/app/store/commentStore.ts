import { create } from "zustand";
import { v4 as uuidv4 } from "uuid"; 

export interface IComment {
    id: string;
    profile: [];
    content: string;
}

interface ICommentStore {
    comments: IComment[];
    addComment: (post: IComment) => void;
    updateComment: (post: IComment) => void;
    removeComment: (id: string) => void;
    setComments: (posts: IComment[]) => void;
}
export const useCommentStore = create<ICommentStore>((set) => ({
    comments: [],
    addComment: (comment) => set((state) => ({ id: uuidv4(), comments: [...state.comments, comment] })),
    updateComment: (comment) => set((state) => ({ comments: state.comments.map((p) => p.id === comment.id ? comment : p) })),
    removeComment: (id) => set((state) => ({ comments: state.comments.filter((p) => p.id !== id) })),
    setComments: (comments) => set({ comments }),
}));