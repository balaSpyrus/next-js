"use client";
import { formatDate } from "@/lib/format";
import LikeButton from "./like-icon";
import { PostType } from "@/types";
import { toggleLikes } from "@/actions/postActions";
import { useOptimistic } from "react";

function Post({
  post,
  action,
}: {
  post: PostType;
  action: (id: string) => void;
}) {
  return (
    <article className="post">
      <div className="post-image">
        <img src={post.imageUrl} alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{" "}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt ?? "")}
              </time>
            </p>
          </div>
          <div>
            <form
              action={action.bind(null, post.id as string)}
              className={post.isLiked ? "liked" : ""}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }: Readonly<{ posts: PostType[] }>) {
  const [optPosts, updatePosts] = useOptimistic<PostType[], string>(
    posts,
    (prev, postId) => {
      const index = prev.findIndex((each) => each.id == postId);

      if (index === -1) return prev;

      const updated: PostType = {
        ...prev[index],
      };

      updated.isLiked = !updated.isLiked;
      updated.likes = updated.likes ?? 0 + (updated.isLiked ? 1 : -1);
      const newPosts = [...prev];
      newPosts[index] = updated;

      return newPosts;
    }
  );

  const updatePostData = async (postId: string) => {
    updatePosts(postId);
    await toggleLikes(postId);
  };

  if (!optPosts?.length) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  return (
    <ul className="posts">
      {optPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePostData} />
        </li>
      ))}
    </ul>
  );
}
