import { useEffect } from "react";
import { usePostStore } from "../app/store/postStore";
import { PostComponent } from "./Post";

/**
 * PostListComponent component.
 * @param {PostListProps} props - The props.
 */
export const PostListComponent = () => {
    const { posts, setPosts } = usePostStore((state) => ({
         posts: state.posts,
         setPosts: state.setPosts,
    }));
    const url = "http://localhost:5000/api";
    useEffect(() => {
         fetch(url)
         .then((res) => res.json())
         .then((data) => {
            setPosts(data);
         })
    }, []);

    return (
        <div className="flex flex-col gap-4">
            {posts.map((post) => (
                <PostComponent key={post.id} post={post} />
            ))}
        </div>
    );
}