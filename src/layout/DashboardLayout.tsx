import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar";

function DashboardLayout() {
  return (
    <Flex minH="100vh" bg="gray.50">
      {/*sidebar*/}
      <Sidebar />

      {/*Main Content*/}
      <Box flex="1" ml="200px" bg="gray.50" minH="100vh">
        <Header />
        <Box p={6}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
}

export default DashboardLayout;
