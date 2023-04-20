import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  useToast,
} from "ui";
import { useRouter } from "next/router";

import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
const validationSchema = z.object({
  email: z.string().email("Email no es valido"),
  password: z.string(),
});
interface IRegisterForm {
  email: string;
  password: string;
}

function RegisterForm() {
  const toast = useToast();
  const router = useRouter();
  const { signUp, isAuthenticated, error,setError,setIsAuthenticated } = useAuth();
  useEffect(() => {
   
    if (router.query.message){
      setError(router.query.message.toString())
    }
    if (error) {
      toast({ title: error, status: "error", position: "top" })
      setIsAuthenticated(false)
  };
  }, [error]);
  useEffect(() => {
    if (isAuthenticated) router.push("/content")
  }, [isAuthenticated]);
  const onSubmit = (values: IRegisterForm) => {
    signUp(values);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    resolver: zodResolver(validationSchema),
  });

  return (
    <Container maxW="lg" py={{ base: "4", md: "10" }} px={{ base: "0", sm: "8" }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={useBreakpointValue({ base: "xs", md: "2xl" })}>
              Smartv Premium
            </Heading>
          </Stack>
        </Stack>
        <Box
          py={{ base: "8", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })}
          boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
          borderRadius={{ base: "none", sm: "xl" }}
          backgroundColor="white"
          textColor="black"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="6">
              <Stack spacing="10">
                <FormControl isInvalid={errors.email?.message ? true : false}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input id="email" type="email" {...register("email")} />
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password?.message ? true : false}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input id="password" type="password" {...register("password")} />
                  <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                </FormControl>
                {/* <PasswordField /> */}
              </Stack>
              <Stack spacing="6">
                <Button variant="solid" colorScheme="teal" size="sm" type="submit">
                  Login
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
}
export default RegisterForm;
