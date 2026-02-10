import z from "zod";
import type { User } from "./user";

export const loginSchema = z.object({
    username: z.string().min(3,"Username is required"),
    password: z.string().min(3, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export interface LoginResponse extends User {
    token: string;
}