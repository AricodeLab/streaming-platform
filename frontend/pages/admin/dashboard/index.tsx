import { useRef, useState } from "react";
import * as S from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Trash } from "@phosphor-icons/react";
import { useAuth } from "../../../hooks/useAuth";
import { useDisclosure } from "@chakra-ui/react";

const schema = z.object({
  email: z.string().email("Email inválido").nonempty("Não pode está vazia"),
  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .nonempty("Não pode está vazia"),
  plazo: z.date().min(new Date(), "Fecha no puede ser antes"),
});

interface AddUserFormInputs {
  email: string;
  password: string;
  plazo: Date;
}

interface User {
  id: number;
  email: string;
  plazo: Date;
}

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
 
  const [editingUser, setEditingUser] = useState(null);
  const deleted = useDisclosure()
  const toast = S.useToast();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<AddUserFormInputs>({ resolver: zodResolver(schema) });
  const { signUp, isAuthenticated } = useAuth();
  const cancelRef = useRef(null)

  const users: User[] = [{ id: 11515, email: "bob@example.com", plazo: new Date() },{ id: 16515, email: "gay@example.com", plazo: new Date() }];
  const onSubmit = (data: any) => {
    console.log(data);
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

    setEditingUser(user);
    handleCloseModal();
  };

  const handleRemoveUser = (user_id: number) => {
    console.log(cancelRef)
    
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
  console.log(cancelRef)

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
            <S.Tr>
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
                    onClick={deleted.onOpen}
                  />
                </S.Td>
              </S.Tr>
            ))}
          </S.Tbody>
        </S.Table>
       
          <S.AlertDialog
            isCentered
            isOpen={deleted.isOpen}
            leastDestructiveRef={cancelRef}
            onClose={()=>console.log(cancelRef)}
          >
            <S.AlertDialogOverlay>
              <S.AlertDialogContent>
                <S.AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete Customer
                </S.AlertDialogHeader>

                <S.AlertDialogBody>
                  Are you sure? You cant undo this action afterwards.
                </S.AlertDialogBody>

                <S.AlertDialogFooter>
                  <S.Button onClick={deleted.onClose}>Cancel</S.Button>
                  <S.Button colorScheme="red" ml={3} onClick={()=>{cancelRef.current = users;deleted.onClose()}}>
                    Delete
                  </S.Button>
                </S.AlertDialogFooter>
              </S.AlertDialogContent>
            </S.AlertDialogOverlay>
          </S.AlertDialog>
      

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
                <S.FormControl mt={4} isInvalid={!!errors.plazo}>
                  <S.FormLabel>Plazo</S.FormLabel>
                  <S.Input type="date" {...register("plazo", { valueAsDate: true })} />
                  <S.FormErrorMessage>{errors?.plazo?.message}</S.FormErrorMessage>
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
                <S.Button colorScheme="green" type="submit">
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
