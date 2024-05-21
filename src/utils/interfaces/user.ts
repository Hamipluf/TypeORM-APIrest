import { type Post } from "./post"
export interface User {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    active: boolean,
    created_at: Date,
    updated_at: Date,
    posts?: Post[]
}
export interface NewUser extends User {
    password: string
}