import { useEffect, useState } from "react";
import DataTable from "../../../components/common/DataTable/DataTable";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useSearchUsersQuery,
} from "../../../services/api/usersApi";
import { userColumnRender } from "./userColumnRenderer";
import type { User } from "../../../types/user";
import AddFavButton from "../../../components/ui/AddFavButton";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  Spinner,
} from "@chakra-ui/react";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import { toaster } from "../../../components/ui/toaster";
import { skipToken } from "@reduxjs/toolkit/query";
import { FaSearch } from "react-icons/fa";

function UsersPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); //وقتی سرچ تغییر کند به صفحه اول برمی گردد
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);
  const isSearching = debouncedSearch.length >= 2;
  const { data: usersData, isLoading: isUsersLoading } = useGetUsersQuery(
    isSearching ? skipToken : { limit: 10, skip: (page - 1) * 10 },
  );
  const { data: searchData, isLoading: isSearchLoading } = useSearchUsersQuery(
    isSearching ? debouncedSearch : skipToken,
  );
  const users = isSearching
    ? (searchData?.users ?? [])
    : (usersData?.users ?? []);

  const total = isSearching
    ? (searchData?.total ?? 0)
    : (usersData?.total ?? 0);

  const totalPages = Math.ceil(total / 10);
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
  if (isUsersLoading || isSearchLoading)
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
      <Box mb={4}>
        <InputGroup startElement={<FaSearch />}>
          <Input
            placeholder="جستجوی کاربر"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </Box>
      {users && (
        <DataTable
          data={users}
          render={userColumnRender}
          actions={actions}
          columns={userColumns}
          onRowClick={onRowClick}
        />
      )}

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
