import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
  Td,
  Text,
  useBreakpointValue,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine, RiPencilFill } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/SideBar";
import { Pagination } from "../../components/Pagination";
import { useEffect } from "react";
import { useQuery } from "react-query";

export default function userList() {
  const { data, isLoading, error } = useQuery("users", async () => {
    const response = await fetch("http://localhost:3000/api/users");

    const data = response.json();

    return data;
  });

  console.log("QUERY:", data);

  const isWideVersion = useBreakpointValue({ base: false, md: true });

  useEffect(() => {}, []);

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Users
            </Heading>

            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Create new
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Error retrieving the users data.</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>User</Th>
                    {isWideVersion && <Th>Register date</Th>}
                    <Th width="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td px={["4", "4", "6"]}>
                      <Checkbox colorScheme="pink" />
                    </Td>
                    <Td>
                      <Box>
                        <Text fontWeight="bold">John Freitas</Text>
                        <Text fontSize="small" color="gray.300">
                          john.freitasau@gmail.com
                        </Text>
                      </Box>
                    </Td>
                    {isWideVersion && <Td>04 of April, 2021</Td>}
                    <Td>
                      {isWideVersion && (
                        <Button
                          as="a"
                          size="sm"
                          fontSize="sm"
                          colorScheme="purple"
                          leftIcon={<Icon as={RiPencilFill} />}
                        >
                          Edit
                        </Button>
                      )}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td px={["4", "4", "6"]}>
                      <Checkbox colorScheme="pink" />
                    </Td>
                    <Td>
                      <Box>
                        <Text fontWeight="bold">John Freitas</Text>
                        <Text fontSize="small" color="gray.300">
                          john.freitasau@gmail.com
                        </Text>
                      </Box>
                    </Td>
                    {isWideVersion && <Td>04 of April, 2021</Td>}
                    <Td>
                      {isWideVersion && (
                        <Button
                          as="a"
                          size="sm"
                          fontSize="sm"
                          colorScheme="purple"
                          leftIcon={<Icon as={RiPencilFill} />}
                        >
                          Edit{" "}
                        </Button>
                      )}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td px="6">
                      <Checkbox colorScheme="pink" />
                    </Td>
                    <Td>
                      <Box>
                        <Text fontWeight="bold">John Freitas</Text>
                        <Text fontSize="small" color="gray.300">
                          john.freitasau@gmail.com
                        </Text>
                      </Box>
                    </Td>
                    {isWideVersion && <Td>04 of April, 2021</Td>}
                    <Td>
                      {isWideVersion && (
                        <Button
                          as="a"
                          size="sm"
                          fontSize="sm"
                          colorScheme="purple"
                          leftIcon={<Icon as={RiPencilFill} />}
                        >
                          Edit{" "}
                        </Button>
                      )}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
              <Pagination />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
