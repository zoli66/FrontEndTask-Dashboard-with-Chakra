import { Center, SimpleGrid, Spinner, VStack } from "@chakra-ui/react";
import { FiUsers, FiBox, FiDollarSign } from "react-icons/fi";
import StatsCard from "./components/StatsCard";
import DashboardChart from "./components/DashboardChart";
import { useGetUsersQuery } from "../../services/api/usersApi";
import { useGetProductsQuery } from "../../services/productsApi";

function DashboardPage() {
  const { data: usersData, isLoading: usersLoading } = useGetUsersQuery({});
  const { data: productsData, isLoading: productsLoading } =
    useGetProductsQuery();

  if (usersLoading || productsLoading) {
    return (
      <Center h="300px">
        <Spinner />
      </Center>
    );
  }
  const stats = [
    { title: "Users", value: usersData?.total || 0, icon: <FiUsers /> },
    { title: "Products", value: productsData?.total || 0, icon: <FiBox /> },
    { title: "Revenue", value: "$12,400", icon: <FiDollarSign /> },
  ];

  const chartData = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 650 },
    { name: "Mar", value: 500 },
    { name: "Apr", value: 800 },
  ];

  return (
    <VStack gap={6} align="stretch">
      {/*Stats Cards */}
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
        {stats.map((s) => (
          <StatsCard
            key={s.title}
            title={s.title}
            value={s.value}
            icon={s.icon}
          />
        ))}
      </SimpleGrid>

      {/* Chart */}

      <DashboardChart data={chartData} />
    </VStack>
  );
}

export default DashboardPage;
