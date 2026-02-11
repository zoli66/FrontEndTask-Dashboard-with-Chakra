import { MdDelete } from "react-icons/md";
import type { RenderType } from "../../components/common/DataTable/DataTable";
import type { User } from "../../types/user";
import { Flex, Icon } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";

export const userColumnRender: RenderType<User> = {
  action: {
    renderColumn: (item, actions) => (
      <Flex gap={4}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            actions.deleteUser(item.id);
          }}
        >
          <Icon size="lg" color="red.500">
            <MdDelete />
          </Icon>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            actions.deleteUser(item.id);
          }}
        >
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
  username: {
    columnHeaderRender: () => <span>نام کاربری</span>,
  },
  firstName: {
    columnHeaderRender: () => <span>نام</span>,
  },
  lastName: {
    columnHeaderRender: () => <span>نام خانوادگی</span>,
  },
};
