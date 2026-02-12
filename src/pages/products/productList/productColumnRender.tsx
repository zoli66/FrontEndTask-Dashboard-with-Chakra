import { MdDelete } from "react-icons/md";
import type { RenderType } from "../../../components/common/DataTable/DataTable";
import type { Product } from "../../../types/product";
import { Flex, Icon } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";

export const productColumnRender: RenderType<Product> = {
  action: {
    renderColumn: (item, actions) => (
      <Flex gap={4}>
        <button>
          <Icon size="lg" color="red.500">
            <MdDelete />
          </Icon>
        </button>
        <button>
          <Icon size="lg" color="blue.500">
            <FaEdit />
          </Icon>
        </button>
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
