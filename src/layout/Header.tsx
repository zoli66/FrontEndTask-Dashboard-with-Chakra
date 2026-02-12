import { Avatar, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  return (
    <Flex
      bg="white"
      h="60px"
      align="center"
      justify="space-between"
      px={6}
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={10}
    >
      {/*عنوان صفحه*/}
      <Text fontWeight="bold" fontSize="lg">
        Dashboard
      </Text>

      {/*بخش کاربر*/}
      <HStack gap={4}>
        {user && <Text>{user.username}</Text>}
        {user && (
          <Avatar.Root shape="square" size="lg">
            <Avatar.Fallback name={`${user.firstName} ${user.lastName}`} />
            <Avatar.Image src={user.image} />
          </Avatar.Root>
        )}
        <Button
          colorScheme="red"
          size="sm"
          onClick={() => {
            dispatch(logout());
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </HStack>
    </Flex>
  );
}
export default Header;
