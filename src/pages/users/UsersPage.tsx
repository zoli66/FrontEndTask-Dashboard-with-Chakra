import { useGetUsersQuery } from "../../services/api/usersApi";

function UsersPage() {
  const { data, isLoading } = useGetUsersQuery({ limit: 10, skip: 0 });
  if (isLoading) return <div>Is Loading...</div>;
  console.log(data);
}
export default UsersPage;
