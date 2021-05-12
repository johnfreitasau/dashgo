import {
  Box,
  Flex,
  Heading,
  Divider,
  VStack,
  SimpleGrid,
  HStack,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { Header } from "../../components/Header";
import { Input } from "../../components/Form/Input";
import { Sidebar } from "../../components/SideBar";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const createUserSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(4, "Password is too short - should be 8 chars minimum."),
  confirmPassword: yup
    .string()
    .when("password", {
      is: (val) => !!val.length,
      then: yup.string().required("Field is required."),
      otherwise: yup.string(),
    })
    .oneOf([null, yup.ref("password")], "The confirmation is incorrect."),
});

export default function createUser() {
  const { register, handleSubmit, formState } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserSchema),
  });

  const { errors } = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(values);
  };

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Create user
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="name"
                label="Full name"
                error={errors.name}
                {...register("name")}
              />
              <Input
                name="email"
                type="email"
                label="Email"
                {...register("email")}
                error={errors.email}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="password"
                type="password"
                label="Password"
                error={errors.password}
                {...register("password")}
              />
              <Input
                name="confirmPassword"
                type="password"
                label="Password confirmation"
                error={errors.confirmPassword}
                {...register("confirmPassword")}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancel</Button>
              </Link>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >
                Save
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
