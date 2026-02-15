import { useState } from "react";
import DataTable from "../../../components/common/DataTable/DataTable";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../../services/api/productsApi";
import type { Product } from "../../../types/product";
import { productColumnRender } from "./productColumnRender";
import AddFavButton from "../../../components/ui/AddFavButton";
import { Spinner } from "@chakra-ui/react";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import { toaster } from "../../../components/ui/toaster";

function ProductsPage() {
  const { data, isLoading } = useGetProductsQuery();
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
  if (isLoading)
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
      {data && (
        <DataTable
          data={data?.products}
          render={productColumnRender}
          actions={actions}
          columns={productColumns}
          onRowClick={onRowClick}
        />
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
