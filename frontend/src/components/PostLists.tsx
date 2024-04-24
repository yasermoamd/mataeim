import { useEffect, useState } from "react";
import { PostComponent } from "./Post";

/**
 * PostListComponent component.
 * @param {PostListProps} props - The props.
 */

interface IPost {
    id?: string;
    content: string;
    user: {
      id: number;
      };
  
  }

export const PostListComponent = () => {
    const [posts, setPosts] = useState([]);
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
            {posts.map((post: IPost) => (
                <PostComponent key={post.id} post={post} />
            ))}
        </div>
    );
}