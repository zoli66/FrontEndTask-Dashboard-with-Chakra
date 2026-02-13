import z from "zod";

export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    images: string[];
}

export const ProductFormSchema = z.object({
    title: z.string().min(1, "نام محصول نمی تواند خالی باشد"),
    category: z.string().min(1, "لطفا یک دسته بندی انتخاب کنید"),
    price: z.number("لطفا قیمت را وارد کنید").min(0, "قیمت باید عدد مثبت باشد"),
    stock: z.number("لطفا موجودی را وارد کنید").min(0, "موجودی باید عدد مثبت باشد"),
    description: z.string().optional(),
    images: z.array(z.string().url("لطفا آدرس معتبر وارد کنید")).optional(),
});

export type ProductFormValues = z.infer<typeof ProductFormSchema>;