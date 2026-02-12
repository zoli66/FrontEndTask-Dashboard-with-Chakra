import {
  Box,
  Button,
  FieldLabel,
  FieldRoot,
  Heading,
  Input,
  NativeSelect,
  Stack,
} from "@chakra-ui/react";
import type { Product } from "../../../types/product";
import { useState } from "react";

function ProductPage() {
  const [product, setProduct] = useState<Product>({
    id: 0,
    title: "",
    description: "",
    category: "",
    price: 0,
    stock: 0,
    images: [],
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setProduct((prev: Product) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    const dto: Omit<Product, "id"> = {
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price,
      stock: product.stock,
      images: product.images,
    };

    console.log("Submitting product:", product);
  };

  return (
    <Box maxW="500px" mx="auto" mt={10} p={6} boxShadow="lg" borderRadius="lg">
      <Heading mb={6}>ثبت محصول</Heading>
      <Stack gap={4}>
        {/* Title */}
        <FieldRoot>
          <FieldLabel>نام محصول</FieldLabel>
          <Input name="title" value={product.title} onChange={handleChange} />
        </FieldRoot>
        {/* Description */}
        <FieldRoot>
          <FieldLabel>توضیحات</FieldLabel>
          <Input
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </FieldRoot>
        {/* Category */}
        <FieldRoot>
          <FieldLabel>دسته بندی</FieldLabel>
          <NativeSelect.Root>
            <NativeSelect.Field
              placeholder="انتخاب دسته بندی"
              value={product.category}
              name="category"
              onChange={handleChange}
            >
              <option value="beauty">زیبایی</option>
              <option value="fragrances">عطر و ادکلن</option>
              <option value="furniture">مبلمان</option>
              <option value="groceries">مواد غذایی</option>
              <option value="home-decoration">دکوراسیون منزل</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </FieldRoot>
        {/* Price */}
        <FieldRoot>
          <FieldLabel>قیمت</FieldLabel>
          <Input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </FieldRoot>
        <FieldRoot>
          <FieldLabel>تعداد موجودی</FieldLabel>
          <Input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
          />
        </FieldRoot>
        <Button colorPalette="blue" onClick={handleSubmit}>
          ثبت
        </Button>
      </Stack>
    </Box>
  );
}

export default ProductPage;
