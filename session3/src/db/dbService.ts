import { delay } from "@/utils";
import { MealItemType } from "@/types";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3({
    region: 'ap-southeast-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
});

const db = sql("meals.db", {
    fileMustExist: true
});

export const getAllMeals = async () => {
    await delay(1500)
    return db.prepare("SELECT * FROM meals").all() as MealItemType[];
}

export const getMeal = async (mealId: string) => {
    await delay(1500)
    return db.prepare("SELECT * FROM meals WHERE slug = ?").get(mealId) as MealItemType;
}

export const saveMeal = async (newMeal: MealItemType) => {
    newMeal.instructions = xss(newMeal.instructions)
    newMeal.slug = slugify(newMeal.title, { lower: true })
    const image = newMeal.image as unknown as File;
    const ext = image.name.split(".").pop();
    const fileName = `${newMeal.slug}.${ext}`;
    const bufferImg = await image.arrayBuffer();

    s3.putObject({
        Bucket: 'spyrus-nextjs-image',
        Key: fileName,
        Body: Buffer.from(bufferImg),
        ContentType: image.type,
    });

    newMeal.image = fileName;

    db.prepare(
        `
        INSERT INTO meals (
        title, summary, instructions, creator, creator_email, image, slug
        ) VALUES (
         @title, @summary, @instructions, @creator, @creator_email, @image, @slug
         )
        `
    ).run(newMeal);
}