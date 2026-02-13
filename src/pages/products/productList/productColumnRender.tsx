import { MdDelete } from "react-icons/md";
import type { RenderType } from "../../../components/common/DataTable/DataTable";
import type { Product } from "../../../types/product";
import { Button, Flex, Icon, Link } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";

export const productColumnRender: RenderType<Product> = {
  action: {
    renderColumn: (item, actions) => (
      <Flex gap={4}>
        <Button
          variant="ghost"
          colorPalette="transparent"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            actions.deleteProduct(item.id);
          }}
        >
          <Icon size="lg" color="red.500">
            <MdDelete />
          </Icon>
        </Button>
        <Link
          href={`/product/edit/${item.id}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Icon size="lg" color="blue.500">
            <FaEdit />
          </Icon>
        </Link>
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
