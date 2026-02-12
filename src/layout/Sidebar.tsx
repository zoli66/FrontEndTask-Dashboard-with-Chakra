import { Box, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <Box w="240" bg="gray.900" color="white" p={4}>
      <Text fontSize="lg" fontWeight="bold" mb={8}>
        Admin Panel
      </Text>
      <VStack align="stretch" gap={2}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Box px={3} py={2} _hover={{ bg: "gray.700" }} borderRadius="md">
            Dashboard
          </Box>
        </Link>
        <Link to="/users" style={{ textDecoration: "none" }}>
          <Box px={3} py={2} _hover={{ bg: "gray.700" }} borderRadius="md">
            Users
          </Box>
        </Link>
        <Link to="/products" style={{ textDecoration: "none" }}>
          <Box px={3} py={2} _hover={{ bg: "gray.700" }} borderRadius="md">
            Products
          </Box>
        </Link>
      </VStack>
    </Box>
  );
}
export default Sidebar;
