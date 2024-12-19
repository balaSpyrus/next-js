import { createPost } from "@/actions/postActions";
import PostForm from "@/components/postForm";

export default function NewPostPage() {
  return (
    <>
      <h1>Create a new post</h1>
      <PostForm action={createPost} />
    </>
  );
}
