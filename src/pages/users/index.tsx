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
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { RiAddLine, RiPencilFill } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/SideBar";
import { Pagination } from "../../components/Pagination";
import { useEffect, useState } from "react";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { QueryClient } from "react-query";
import { queryClient } from "../../services/react-query/queryClient";
import { api } from "../../services/api";
import { GetServerSideProps } from "next";

export default function userList() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error } = useUsers(page);

  // const { data, isLoading, isFetching, error } = useUsers(page, {
  //   initialData: users,
  // });

  const isWideVersion = useBreakpointValue({ base: false, md: true });

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ["user", userId],
      async () => {
        const response = await api.get(`users/${userId}`);

        console.log("USER:", response.data);
        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10, //10 mins
      }
    );
  }

  return (
    <Box>
      ``
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Users
              {isFetching && !isLoading && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>

            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Create new
              </Button>
            </NextLink>
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
                  {data.users.map((user) => (
                    <Tr key={user.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Link
                            onMouseEnter={() => handlePrefetchUser(user.id)}
                          >
                            <Text fontWeight="bold">{user.name}</Text>
                          </Link>
                          <Text fontSize="small" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{user.createdAt}</Td>}
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
                  ))}
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

//React Query with SSR - not supported on MirageJS at present, so I have commented it.

// export const getServerSideProps: GetServerSideProps = async () => {
//   const {users, totalCount} = await getUsers(1);

//   return {
//     props: {
//       users,
//       totalCount
//     },
//   };
// };
