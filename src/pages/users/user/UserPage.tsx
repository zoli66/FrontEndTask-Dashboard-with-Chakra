import { useState } from "react";
import type { User } from "../../../types/user";
import { useCreateUserMutation } from "../../../services/api/usersApi";
import {
  Box,
  Button,
  FieldLabel,
  FieldRoot,
  Heading,
  Input,
  NativeSelect,
  Stack,
} from "@chakra-ui/react";

function UserPage() {
  const [user, setUser] = useState<User>({
    id: 0,
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    image: "",
  });
  const [createUser] = useCreateUserMutation();
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setUser((prev: User) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const dto: Omit<User, "id"> = {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      gender: user.gender,
      image: user.image,
    };
    const res = createUser(dto);
    console.log(res);
  };

  return (
    <Box maxW="500px" mx="auto" mt={10} p={6} boxShadow="lg" borderRadius="lg">
      <Heading mb={6}>ثبت کاربر</Heading>
      <Stack gap={4}>
        {/* Name */}
        <FieldRoot>
          <FieldLabel>نام</FieldLabel>
          <Input
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
          />
        </FieldRoot>
        {/* Last Name */}
        <FieldRoot>
          <FieldLabel>نام خانوادگی</FieldLabel>
          <Input
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
        </FieldRoot>
        {/* Username */}
        <FieldRoot>
          <FieldLabel>نام کاربری</FieldLabel>
          <Input
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </FieldRoot>
        {/* Email */}
        <FieldRoot>
          <FieldLabel>ایمیل</FieldLabel>
          <Input
            name="email"
            type="email"
            value={user.email}
            placeholder="you@example.com"
            onChange={handleChange}
          />
        </FieldRoot>
        {/* Gender */}
        <FieldRoot>
          <FieldLabel>جنسیت</FieldLabel>
          <NativeSelect.Root>
            <NativeSelect.Field
              placeholder="انتخاب جنسیت"
              value={user.gender}
              name="gender"
              onChange={handleChange}
            >
              <option value="male">مرد</option>
              <option value="female">زن</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </FieldRoot>
        <Button colorPalette="blue" onClick={handleSubmit}>
          ثبت کاربر
        </Button>
      </Stack>
    </Box>
  );
}

export default UserPage;
