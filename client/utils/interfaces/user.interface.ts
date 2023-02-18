export interface IUser {
    id: string;
    name: string;
    phone: string;
    zalo: string | null;
    url: string | null;
    image: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface IUpdateUser {
    email: string;
    image: string;
    name: string;
    url: string;
    zalo: string;
}
