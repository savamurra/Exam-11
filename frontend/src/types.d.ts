export interface UserFields {
    _id: string;
    username: string;
    token: string;
}

export interface RegisterMutation {
    username: string;
    password: string;
    displayName: string;
    phoneNumber: string;
}

export interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    category: {
        name: string;
    };
    sellerInfo: {
        displayName: string;
        phoneNumber: string;
    }
}

export interface Category {
    _id: string;
    name: string;
}

export interface ProductMutation {
    title: string;
    description: string;
    price: string;
    image: File | null;
    category: string;
    sellerInfo: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface RegisterResponse {
    user: User;
    message: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        };
    };
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string;
}


