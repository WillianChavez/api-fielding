/* eslint-disable prettier/prettier */
import { v4 as uuidv4 } from 'uuid';

export interface PrimitiveUser {
    id: string;
    name: string;
    email: string;
    createdAt?: Date;
    deletedAt?: Date;
    urlPhoto?: string;
}

export interface UserAttributes {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    deletedAt?: Date | null;
    urlPhoto?: string | null;
}


export class User {
    constructor(private attributes: UserAttributes) {}

    static create(data: { name: string; email: string; password: string; urlPhoto?: string }): User {
        return new User({
            id: uuidv4(),
            name: data.name,
            email: data.email,
            password: data.password,
            createdAt: new Date(),
            deletedAt: null,
            urlPhoto: data.urlPhoto ?? null
        });
    }

    toValue(): PrimitiveUser {
        return {
            id: this.attributes.id,
            name: this.attributes.name,
            email: this.attributes.email,
            createdAt: this.attributes.createdAt,
            deletedAt: this.attributes.deletedAt,
            urlPhoto: this.attributes.urlPhoto
        };
    }
}

