import {
  Box,
  Button,
  Field,
  FieldLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { type LoginFormValues, loginSchema } from "../../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../../services/api/authApi";
import { useAppDispatch } from "../../store/hooks";
import { setCredentials } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormValues) {
    try {
      const res = await login(data).unwrap();
      const { token, ...user } = res;
      dispatch(setCredentials({ user, token }));

      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
    console.log(data);
  }

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.100"
    >
      <Box bg="white" p={8} rounded="2xl" shadow="lg" w="full" maxW="420px">
        <Heading textAlign="center" mb={6}>
          Login
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={4}>
            {/*username*/}
            <Field.Root invalid={!!errors.username}>
              <FieldLabel>Username</FieldLabel>
              <Input placeholder="Enter username" {...register("username")} />
              <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
            </Field.Root>

            {/*password*/}
            <Field.Root invalid={!!errors.password}>
              <FieldLabel>Password</FieldLabel>
              <Input
                type="password"
                placeholder="Enter password"
                {...register("password")}
              />
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>

            <Button type="submit" colorPalette="green" loading={isLoading}>
              Login
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default LoginPage;
