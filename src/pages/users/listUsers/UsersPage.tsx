import { useState } from "react";
import DataTable from "../../../components/common/DataTable/DataTable";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../../services/api/usersApi";
import { userColumnRender } from "./userColumnRenderer";
import type { User } from "../../../types/user";
import AddFavButton from "../../../components/ui/AddFavButton";
import { Spinner } from "@chakra-ui/react";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import { toaster } from "../../../components/ui/toaster";

function UsersPage() {
  const { data, isLoading } = useGetUsersQuery({ limit: 10, skip: 0 });
  const [deleteUser] = useDeleteUserMutation();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [userColumns, setUserColumns] = useState<string[]>([
    "id",
    "username",
    "firstName",
    "lastName",
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
    onDelete: (user: User) => {
      setSelectedUser(user);
      setOpen(true);
    },
  };

  function onRowClick(rowData: User) {
    alert("Row clicked: " + rowData.id);
  }

  return (
    <>
      <AddFavButton to="/user/add" />
      {data && (
        <DataTable
          data={data.users}
          render={userColumnRender}
          actions={actions}
          columns={userColumns}
          onRowClick={onRowClick}
        />
      )}
      <ConfirmDialog
        isOpen={open}
        onOpenChange={setOpen}
        title="حذف کاربر"
        description={`آیا از حذف کاربر با نام ${selectedUser?.firstName} مطمئن هستید؟`}
        onConfirm={async () => {
          if (!selectedUser) return;
          try {
            const res = await deleteUser(selectedUser.id).unwrap();
            if (res.isDeleted) {
              toaster.create({
                title: "موفقیت آمیز!",
                description: `کاربر با شناسه ${selectedUser.id} با موفقیت حذف شد`,
                type: "success",
                closable: true,
                duration: 5000,
              });
            }
          } catch (error) {
            console.error(error);
          }
          setOpen(false);
          setSelectedUser(null);
        }}
      />
    </>
  );
}
export default UsersPage;
