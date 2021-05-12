import { Flex, Button, Stack, FormLabel, FormControl } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormData = {
  email: string;
  password: string;
};

const signInFormschema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(4, "Password is too short - should be 8 chars minimum."),
});

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: yupResolver(signInFormschema),
  });

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
            error={errors.email}
            {...register("email")}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            error={errors.password}
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
