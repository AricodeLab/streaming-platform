import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as S from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import { ILogin } from "../../interfaces";

type LoginFormInputs = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().email().nonempty({ message: "Username is required" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

function Admin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(schema),
  });
  const { signUp,isAdmin,setIsAdmin } = useAuth();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data: ILogin) => {
    signUp(data,true)
  };
  return (
    <S.Flex
      alignItems="center"
      justifyContent="center"
      height="100vh"
      flexDirection="column"
      gap="15px"
      backgroundColor="gray.900"
    >
      <S.Heading as="h2" size="xl" color="blue.500">
        Admin
      </S.Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <S.FormControl id="username" marginBottom="4" isInvalid={!!errors.email}>
          <S.FormLabel color="blue.600">Username</S.FormLabel>
          <S.Input type="text" {...register("email")} />
          <S.FormErrorMessage>{errors?.email?.message}</S.FormErrorMessage>
        </S.FormControl>

        <S.FormControl id="password" marginBottom="4" isInvalid={!!errors.password}>
          <S.FormLabel color="blue.600">Password</S.FormLabel>
          <S.Input type="password" {...register("password")} />
          <S.FormErrorMessage>{errors?.password?.message}</S.FormErrorMessage>
        </S.FormControl>

        <S.Button type="submit" colorScheme="blue" width="full" isLoading={isSubmitting}>
          Login
        </S.Button>
      </form>
    </S.Flex>
  );
}
export default Admin;
