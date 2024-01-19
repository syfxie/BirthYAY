export type User = {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    birthday: string;
    age: number;
}

export type Gift = {
    name: string;
    price: number;
    starred: boolean;
    receiver?: User;
}

