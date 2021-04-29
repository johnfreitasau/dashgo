import { Flex, SimpleGrid, Box, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { Header } from "../components/Header";
import { Sidebar } from "../components/SideBar";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options = {};

const series = [
  {
    name: "series1",
    data: [31, 120, 20, 40, 60, 70, 23, 25],
  },
];

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        {/* <SimpleGrid flex="1" gap="4" minChildWith="320px" align="flex-start"> */}
        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          columns={[1, null, 4]}
        >
          <Box p="8" bg="gray.800" borderRadius={8}>
            <Text fontSize="lg" mb="4">
              Week's subscribers
              <Chart
                options={options}
                series={series}
                type="area"
                height={160}
              />
            </Text>
          </Box>
          <Box p="8" bg="gray.800" borderRadius={8}>
            <Text fontSize="lg" mb="4">
              Opening tax
            </Text>
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
