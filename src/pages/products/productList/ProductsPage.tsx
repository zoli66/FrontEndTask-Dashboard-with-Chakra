import { useEffect, useState } from "react";
import DataTable from "../../../components/common/DataTable/DataTable";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useSearchProductsQuery,
} from "../../../services/api/productsApi";
import type { Product } from "../../../types/product";
import { productColumnRender } from "./productColumnRender";
import AddFavButton from "../../../components/ui/AddFavButton";
import { Box, Button, Flex, Input, Spinner } from "@chakra-ui/react";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import { toaster } from "../../../components/ui/toaster";
import { skipToken } from "@reduxjs/toolkit/query";

function ProductsPage() {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [debouncedSearch, setDebouncesdSearch] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncesdSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const isSearching = debouncedSearch.length >= 2;

  const { data: productsData, isLoading: isProductsLoading } =
    useGetProductsQuery(
      isSearching ? skipToken : { limit: 10, skip: (page - 1) * 10 },
    );

  const { data: searchData, isLoading: isSearchLoading } =
    useSearchProductsQuery(isSearching ? debouncedSearch : skipToken);

  const products = isSearching
    ? (searchData?.products ?? [])
    : (productsData?.products ?? []);

  const total = isSearching
    ? (searchData?.total ?? 0)
    : (productsData?.total ?? 0);

  const totalPages = Math.ceil(total / 10);
  const [deleteProduct] = useDeleteProductMutation();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const [productColumns, setProductColumns] = useState<string[]>([
    "id",
    "title",
    "description",
    "price",
    "action",
  ]);
  if (isProductsLoading || isSearchLoading)
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Spinner size="lg" color="teal.500" /> Loading...
      </div>
    );

  const actions = {
    onDelete: (product: Product) => {
      setSelectedProduct(product);
      setOpen(true);
    },
  };

  function onRowClick(rowData: Product) {
    alert("Row clicked: " + rowData.id);
  }

  return (
    <>
      <AddFavButton to="/product/add" />
      <Box mb={4}>
        <Input
          placeholder="جستجوی محصول"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      {products && (
        <DataTable
          data={products}
          render={productColumnRender}
          actions={actions}
          columns={productColumns}
          onRowClick={onRowClick}
        />
      )}

      {/* Pagination */}
      {!isSearching && totalPages > 1 && (
        <Flex mt={4} gap={2} justify="center">
          <Button
            size="sm"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
          >
            قبلی
          </Button>

          <Box px={3} py={1}>
            {page} / {totalPages}
          </Box>

          <Button
            size="sm"
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
          >
            بعدی
          </Button>
        </Flex>
      )}
      {/* Dialog For Confirm Delete Product */}
      <ConfirmDialog
        isOpen={open}
        onOpenChange={setOpen}
        title="حذف محصول"
        description={`آیا از حذف محصول با نام ${selectedProduct?.title} مطمئن هستید؟`}
        onConfirm={async () => {
          if (!selectedProduct) return;
          try {
            const res = await deleteProduct(selectedProduct.id).unwrap();
            if (res.isDeleted) {
              toaster.create({
                title: "موفقیت آمیز!",
                description: `محصول با شناسه ${selectedProduct.id} با موفقیت حذف شد.`,
                type: "success",
                closable: true,
                duration: 5000,
              });
            }
          } catch (error) {
            console.error(error);
          }
          setSelectedProduct(null);
          setOpen(false);
        }}
      />
    </>
  );
}

export default ProductsPage;
