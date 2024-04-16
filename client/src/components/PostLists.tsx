import { IPost, usePostStore } from "../app/store/postStore";
import { PostComponent } from "./Post";

/**
 * PostListProps interface.
 * @interface PostListProps
 * @property {IPost[]} posts - The posts.
 * @property {Function} onEditPost - The onEditPost function.
 */
interface PostListProps {
    onEditPost: (postId: string) => void;
}

/**
 * PostListComponent component.
 * @param {PostListProps} props - The props.
 */
export const PostListComponent: React.FC<PostListProps> = () => {
    const { posts } = usePostStore((state) => ({
         posts: state.posts,
    }));

    return (
        <div className="flex flex-col gap-4">
            {posts.map((post) => (
                <PostComponent key={post.id!} post={post} />
            ))}
        </div>
    );
}