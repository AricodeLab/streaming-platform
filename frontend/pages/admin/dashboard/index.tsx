import { useState } from "react";
import * as S from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Trash } from "@phosphor-icons/react";

const schema = z.object({
  email: z.string().email("Email inválido").nonempty("Não pode está vazia"),
  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .nonempty("Não pode está vazia"),
});

interface AddUserFormInputs {
  email: string;
  password: string;
}

interface User {
  id: number;
  email: string;
  plazo?: Date;
}

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const toast = S.useToast();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<AddUserFormInputs>({ resolver: zodResolver(schema) });

  const users: User[] = [{ id: 11515, email: "bob@example.com", plazo: new Date() }];

  const onSubmit = (data: AddUserFormInputs) => {
    toast({
      title: "Usuario deletado com sucesso",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
    reset();
  };

  const handleOpenModal = () => {
    setEditingUser(null);
    setIsOpen(true);
    reset();
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    reset();
  };

  const handleEditUser = (user: User) => {
    handleOpenModal();
    if (!!errors.password && !!errors.email) return;
    else {
      setEditingUser(user);
      handleCloseModal();
    }
  };

  const handleRemoveUser = (user_id: number) => {
    toast({
      title: "Usuario deletado com sucesso",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleSaveUser = () => {
    if (!!errors.password && !!errors.email) return;
    else {
      toast({
        title: editingUser ? "User editado com sucesso" : "User adicionado com sucesso",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      handleCloseModal();
    }
  };

  return (
    <S.Box p="4" textAlign="center" placeContent="center">
      <S.Heading as="h2" size="2xl" noOfLines={1} color="facebook.600">
        Tablero para administrar usuarios{" "}
      </S.Heading>
      <S.Flex flexDirection="column" p="16" m="auto">
        <S.Button alignSelf="flex-end" colorScheme="green" onClick={handleOpenModal}>
Agregar usuario
        </S.Button>
        <S.Table variant="simple" color="white">
          <S.TableCaption>Lista de Usuários</S.TableCaption>
          <S.Thead>
            <S.Tr >
              <S.Th>Id</S.Th>
              <S.Th>E-mail</S.Th>
              <S.Th>Plazo</S.Th>
              <S.Th>Comportamiento</S.Th>
            </S.Tr>
          </S.Thead>
          <S.Tbody>
            {users.map((user) => (
              <S.Tr key={user.id}>
                <S.Td>{user.id}</S.Td>
                <S.Td>{user.email}</S.Td>
                <S.Td>{user.plazo.toLocaleDateString()}</S.Td>
                <S.Td>
                  <S.IconButton
                    aria-label="Editar"
                    icon={<Pencil size={32} color="black" />}
                    mr="2"
                    onClick={() => handleEditUser(user)}
                  />
                  <S.IconButton
                    aria-label="Remover"
                    icon={<Trash size={32} />}
                    colorScheme="red"
                    onClick={() => handleRemoveUser(user.id)}
                  />
                </S.Td>
              </S.Tr>
            ))}
          </S.Tbody>
        </S.Table>
        <S.Modal
          isCentered
          isOpen={isOpen}
          onClose={handleCloseModal}
          closeOnOverlayClick={false}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <S.ModalOverlay />
            <S.ModalContent>
              <S.ModalHeader>
                {editingUser ? "Editar Usuário" : "Adicionar Usuário"}
              </S.ModalHeader>
              <S.ModalCloseButton />
              <S.ModalBody>
                <S.FormControl mt={4} isInvalid={!!errors.email}>
                  <S.FormLabel>Correo electrónico</S.FormLabel>
                  <S.Input type="email" {...register("email")} />
                  <S.FormErrorMessage>{errors?.email?.message}</S.FormErrorMessage>
                </S.FormControl>
                <S.FormControl mt={4} isInvalid={!!errors.password}>
                  <S.FormLabel>Contraseña</S.FormLabel>
                  <S.Input type="password" {...register("password")} />
                  <S.FormErrorMessage>{errors?.password?.message}</S.FormErrorMessage>
                </S.FormControl>
              </S.ModalBody>
              <S.ModalFooter>
                <S.Button
                  colorScheme="blue"
                  mr={3}
                  onClick={handleCloseModal}
                  type="submit"
                >
                  Cancelar
                </S.Button>
                <S.Button colorScheme="green" type="submit" onClick={handleSaveUser}>
                  Ahorrar
                </S.Button>
              </S.ModalFooter>
            </S.ModalContent>
          </form>
        </S.Modal>
      </S.Flex>
    </S.Box>
  );
}

export default Dashboard;
