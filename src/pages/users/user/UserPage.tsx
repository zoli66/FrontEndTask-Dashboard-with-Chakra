import { FormSchema, type UserFormValues } from "../../../types/user";
import { useCreateUserMutation } from "../../../services/api/usersApi";
import {
  Box,
  Button,
  Field,
  Heading,
  Input,
  NativeSelect,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function UserPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<UserFormValues>({
    resolver: zodResolver(FormSchema),
  });

  const [createUser, { isLoading }] = useCreateUserMutation();

  const onSubmit = async (data: UserFormValues) => {
    try {
      const res = await createUser(data).unwrap();
      resetField("firstName");
      resetField("lastName");
      resetField("username");
      resetField("email");
      resetField("gender");
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box maxW="500px" mx="auto" mt={10} p={6} boxShadow="lg" borderRadius="lg">
      <Heading mb={6}>ثبت کاربر</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={4}>
          {/* Name */}
          <Field.Root invalid={!!errors.firstName}>
            <Field.Label>نام</Field.Label>
            <Input {...register("firstName")} />
            <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
          </Field.Root>
          {/* Last Name */}
          <Field.Root invalid={!!errors.lastName}>
            <Field.Label>نام خانوادگی</Field.Label>
            <Input {...register("lastName")} />
            <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
          </Field.Root>
          {/* Username */}
          <Field.Root invalid={!!errors.username}>
            <Field.Label>نام کاربری</Field.Label>
            <Input {...register("username")} />
            <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
          </Field.Root>
          {/* Email */}
          <Field.Root invalid={!!errors.email}>
            <Field.Label>ایمیل</Field.Label>
            <Input placeholder="you@example.com" {...register("email")} />
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>
          {/* Gender */}
          <Field.Root invalid={!!errors.gender}>
            <Field.Label>جنسیت</Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field
                placeholder="انتخاب جنسیت"
                {...register("gender")}
              >
                <option value="male">مرد</option>
                <option value="female">زن</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            <Field.ErrorText>{errors.gender?.message}</Field.ErrorText>
          </Field.Root>
          <Button colorPalette="green" type="submit" loading={isLoading}>
            ثبت کاربر
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default UserPage;
