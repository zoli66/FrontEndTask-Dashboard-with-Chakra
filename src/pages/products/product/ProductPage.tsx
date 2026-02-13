import {
  Box,
  Button,
  Field,
  Heading,
  Input,
  NativeSelect,
  Stack,
} from "@chakra-ui/react";
import {
  ProductFormSchema,
  type ProductFormValues,
} from "../../../types/product";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../services/api/productsApi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function ProductPage() {
  const { mode, productId } = useParams();
  const isEditing = mode === "edit";
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(ProductFormSchema),
  });
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [updateProduct, { isloading: isUpdating }] = useUpdateProductMutation();
  const { data: product, isFetching } = useGetProductByIdQuery(
    Number(productId),
    {
      skip: !isEditing,
    },
  );

  useEffect(() => {
    if (isEditing && product) {
      reset(product);
    }
  }, [product, isEditing, reset]);

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const res = isEditing
        ? await updateProduct({ id: Number(productId), ...data }).unwrap()
        : await createProduct(data).unwrap();

      console.log(res);
      navigate("/products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box maxW="500px" mx="auto" mt={10} p={6} boxShadow="lg" borderRadius="lg">
      <Heading mb={6}>{!isEditing ? "ثبت محصول" : "ویرایش محصول"}</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={4}>
          {/* Title */}
          <Field.Root invalid={!!errors.title}>
            <Field.Label>نام محصول</Field.Label>
            <Input {...register("title")} />
            <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
          </Field.Root>
          {/* Description */}
          <Field.Root>
            <Field.Label>توضیحات</Field.Label>
            <Input {...register("description")} />
            <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
          </Field.Root>
          {/* Category */}
          <Field.Root invalid={!!errors.category}>
            <Field.Label>دسته بندی</Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field
                placeholder="انتخاب دسته بندی"
                {...register("category")}
              >
                <option value="beauty">زیبایی</option>
                <option value="fragrances">عطر و ادکلن</option>
                <option value="furniture">مبلمان</option>
                <option value="groceries">مواد غذایی</option>
                <option value="home-decoration">دکوراسیون منزل</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            <Field.ErrorText>{errors.category?.message}</Field.ErrorText>
          </Field.Root>
          {/* Price */}
          <Field.Root invalid={!!errors.price}>
            <Field.Label>قیمت</Field.Label>
            <Input
              type="number"
              {...register("price", { valueAsNumber: true })}
            />
            <Field.ErrorText>{errors.price?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors.stock}>
            <Field.Label>تعداد موجودی</Field.Label>
            <Input
              type="number"
              {...register("stock", { valueAsNumber: true })}
            />
            <Field.ErrorText>{errors.stock?.message}</Field.ErrorText>
          </Field.Root>
          <Button
            colorPalette="green"
            type="submit"
            loading={isEditing ? isUpdating : isLoading}
          >
            {isEditing ? "ویرایش محصول" : "ثبت محصول"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default ProductPage;
