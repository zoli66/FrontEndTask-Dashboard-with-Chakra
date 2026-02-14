import { MdDelete } from "react-icons/md";
import type { RenderType } from "../../../components/common/DataTable/DataTable";
import type { Product } from "../../../types/product";
import { Button, Flex, Icon, Link } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { toaster } from "../../../components/ui/toaster";

export const productColumnRender: RenderType<Product> = {
  action: {
    renderColumn: (item, actions) => (
      <Flex gap={4}>
        <Button
          variant="ghost"
          colorPalette="transparent"
          onClick={async (e) => {
            e.stopPropagation();
            e.preventDefault();
            try {
              const res = await actions.deleteProduct(item.id).unwrap();
              if (res.isDeleted) {
                toaster.create({
                  title: "موفقیت آمیز...",
                  description: `محصول با شناسه ${res.id} با موفقیت حذف شد`,
                  type: "success",
                  closable: true,
                  duration: 5000,
                });
              }
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <Icon size="lg" color="red.500">
            <MdDelete />
          </Icon>
        </Button>
        <Button asChild variant="ghost">
          <Link
            href={`/product/edit/${item.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Icon size="lg" color="blue.500">
              <FaEdit />
            </Icon>
          </Link>
        </Button>
      </Flex>
    ),
    columnHeaderRender: () => <span>عملیات</span>,
  },
  id: {
    columnHeaderRender: () => <span>شناسه</span>,
  },
  title: {
    columnHeaderRender: () => <span>نام محصول</span>,
  },
  description: {
    columnHeaderRender: () => <span>توضیحات</span>,
  },
  price: {
    columnHeaderRender: () => <span>قیمت</span>,
  },
};
