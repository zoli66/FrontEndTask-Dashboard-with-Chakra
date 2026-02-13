import z from "zod";

export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
}

export const FormSchema = z.object({
    firstName: z.string().min(1, "ورود نام الزامی است"),
    lastName: z.string().min(1, "ورود نام خانوادگی الزامی است"),
    username : z.string().min(5, "نام کاربری باید حداقل 5 کاراکتر باشد"),
    email: z.string().email("ایمیل نامعتبر است"),
    gender: z.string().min(1, "لطفا جنسیت را انتخاب کنید"),
});

export type UserFormValues = z.infer<typeof FormSchema>;