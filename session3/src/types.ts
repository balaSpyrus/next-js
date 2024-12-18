import { StaticImageData } from "next/image";

 export type NavLinkType = {
    route:string,
name:string;
}

export type SlideShowImgType = {
    image:StaticImageData,
alt:string;
}

export type MealItemType = {
    id?:string,
    title: string;
    slug: string;
    instructions: string;
    creator_email:string;
    image: string;
    summary: string;
    creator: string;
  };