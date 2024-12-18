export type PostType = {
    id?: string;
    userId: string;
    title: string;
    imageUrl: string;
    createdAt?: string;
    userFirstName?: string;
    userLasttName?: string;
    likes?: number;
    isLiked?: boolean;
    content: string;
}

export type UserType = {
    id: string;
    firstName: string;
    lastName: string;
    email: string
}