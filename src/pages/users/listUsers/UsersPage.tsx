import { useState } from "react";
import DataTable from "../../../components/common/DataTable/DataTable";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../../services/api/usersApi";
import { userColumnRender } from "./userColumnRenderer";
import type { User } from "../../../types/user";

function UsersPage() {
  const { data, isLoading } = useGetUsersQuery({ limit: 10, skip: 0 });
  const [deleteUser] = useDeleteUserMutation();
  const [userColumns, setUserColumns] = useState<string[]>([
    "id",
    "username",
    "firstName",
    "lastName",
    "action",
  ]);
  if (isLoading) return <div>Is Loading...</div>;

  const actions = {
    deleteUser,
  };

  function onRowClick(rowData: User) {
    alert("Row clicked: " + rowData.id);
  }

  return (
    <>
      {data && (
        <DataTable
          data={data.users}
          render={userColumnRender}
          actions={actions}
          columns={userColumns}
          onRowClick={onRowClick}
        />
      )}
    </>
  );
}
export default UsersPage;
