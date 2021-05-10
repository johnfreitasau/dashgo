import { Flex, Button, Stack, FormLabel, FormControl } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm<FormData>();

  const { errors } = formState;

  function handleSignIn(values) {
    console.log(values);
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            name="email"
            type="email"
            label="Email"
            {...register("email", { required: "Email is required." })}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            {...register("password")}
          />
        </Stack>
        <Button type="submit" mt="6" colorScheme="pink" size="lg">
          Enter
        </Button>
      </Flex>
    </Flex>
  );
}
