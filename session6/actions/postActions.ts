"use server"

import { uploadImage } from "@/lib/cloudinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(
    _prevState: { errors?: string[] },
    formData: FormData
) {
    "use server";
    const errors: string[] = [];
    const title = formData.get("title") as string;
    const image = formData.get("image") as File;
    const content = formData.get("content") as string;

    if (!title?.trim().length) errors.push("title Required");
    if (!content?.trim().length) errors.push("content Required");
    if (!image?.size) errors.push("Image Required");

    if (errors.length) {
        return { errors };
    }

    let image_url = '';
    try {
        image_url = await uploadImage(image)
    } catch {
        throw new Error("Image Upload Failed")
    }

    await storePost({
        imageUrl: image_url,
        title,
        content,
        userId: 1 + "",
    });
    revalidatePath('/feed')
    redirect("/feed");
}

export const toggleLikes = async (postId: string) => {
    await updatePostLikeStatus(postId, 2 + "")
    revalidatePath('/feed')
};