import { MdDelete } from "react-icons/md";
import type { RenderType } from "../../../components/common/DataTable/DataTable";
import type { User } from "../../../types/user";
import { Button, Flex, Icon, Link } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { toaster } from "../../../components/ui/toaster";

export const userColumnRender: RenderType<User> = {
  action: {
    renderColumn: (item, actions) => (
      <Flex gap={4}>
        <Button
          variant="ghost"
          onClick={async (e) => {
            e.stopPropagation();
            e.preventDefault();
            try {
              const res = await actions.deleteUser(item.id).unwrap();
              if (res.isDeleted) {
                toaster.create({
                  title: "موفقیت آمیز!",
                  description: `کاربر با شناسه ${res.id} با موفقیت حذف شد`,
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
            href={`/user/edit/${item.id}`}
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
