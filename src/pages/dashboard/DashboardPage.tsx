import { SimpleGrid, VStack } from "@chakra-ui/react";
import { FiUsers, FiBox, FiDollarSign } from "react-icons/fi";
import StatsCard from "./components/StatsCard";

function DashboardPage() {
  const stats = [
    { title: "Users", value: 1240, icon: <FiUsers /> },
    { title: "Products", value: 530, icon: <FiBox /> },
    { title: "Revenue", value: "$12,400", icon: <FiDollarSign /> },
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
    </VStack>
  );
}

export default DashboardPage;
