import { Box, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { FiBox, FiHome, FiUsers } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { label: "داشبورد", path: "/", icon: FiHome },
  { label: "کاربران", path: "/users", icon: FiUsers },
  { label: "محصولات", path: "/products", icon: FiBox },
];

function Sidebar() {
  const location = useLocation();
  return (
    <Box
      w="240px"
      bg="gray.900"
      color="gray.200"
      p={5}
      minH="100vh"
      borderRight="1px solid"
      borderColor="gray.800"
    >
      {/* Logo / Title */}
      <Text
        fontSize="xl"
        fontWeight="bold"
        mb={8}
        color="white"
        letterSpacing="wide"
      >
        داشبورد مدیریت
      </Text>
      <VStack align="stretch" gap={2}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{ textDecoration: "none" }}
            >
              <Flex
                align="center"
                px={4}
                py={3}
                borderRadius="lg"
                transition="all 0.2s"
                bg={isActive ? "blue.600" : "transparent"}
                color={isActive ? "white" : "gray.300"}
                _hover={{
                  bg: isActive ? "blue.600" : "gray.800",
                  color: "white",
                }}
                gap={2}
              >
                <Icon as={item.icon} boxSize={5} mr={3} />
                <Text fontWeight={isActive ? "semibold" : "medium"}>
                  {item.label}
                </Text>
              </Flex>
            </Link>
          );
        })}
      </VStack>
    </Box>
  );
}
export default Sidebar;
