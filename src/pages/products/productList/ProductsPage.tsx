import { useState } from "react";
import DataTable from "../../../components/common/DataTable/DataTable";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../../services/api/productsApi";
import type { Product } from "../../../types/product";
import { productColumnRender } from "./productColumnRender";
import AddFavButton from "../../../components/ui/AddFavButton";

function ProductsPage() {
  const { data, isLoading } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [productColumns, setProductColumns] = useState<string[]>([
    "id",
    "title",
    "description",
    "price",
    "action",
  ]);
  if (isLoading) return <div>Loading...</div>;

  const actions = {
    deleteProduct,
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
    </>
  );
}

export default ProductsPage;
