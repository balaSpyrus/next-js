"use server";

import { saveMeal } from "@/db/dbService";
import { MealItemType } from "@/types";
import { satisfiesRequired } from "@/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const shareMeal = async (_prevState: { message: string }, formData: FormData) => {
    const newMeal: Omit<MealItemType, 'slug'> = {
        title: formData.get("title") as string,
        instructions: formData.get("instructions") as string,
        creator: formData.get("name") as string,
        creator_email: formData.get("email") as string,
        summary: formData.get("summary") as string,
        image: formData.get("image") as string,
    };

    if (!satisfiesRequired(newMeal.title) ||
        !satisfiesRequired(newMeal.instructions) ||
        !satisfiesRequired(newMeal.creator) ||
        !satisfiesRequired(newMeal.creator_email) ||
        !satisfiesRequired(newMeal.summary)
    ) {
        return { message: "All Inputs are required" }
    }

    saveMeal(newMeal as MealItemType)
    revalidatePath('/meals')
    redirect("/meals")

};
