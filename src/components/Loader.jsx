import { Skeleton, HStack, Box, VStack } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Box my={["10", "20"]}>
      <HStack wrap={"wrap"} gap={"10"} justifyContent={"space-evenly"}>
        <Skeleton height="52" w={"52"} bg="black"></Skeleton>
        <Skeleton height="52" w={"52"} bg="black"></Skeleton>
        <Skeleton height="52" w={"52"} bg="black"></Skeleton>
        <Skeleton height="52" w={"52"} bg="black"></Skeleton>
        <Skeleton height="52" w={"52"} bg="black"></Skeleton>
        <Skeleton height="52" w={"52"} bg="black"></Skeleton>
        <Skeleton height="52" w={"52"} bg="black"></Skeleton>
        <Skeleton height="52" w={"52"} bg="black"></Skeleton>
        <Skeleton height="52" w={"52"} bg="black"></Skeleton>
        <Skeleton height="52" w={"52"} bg="black"></Skeleton>
        <Skeleton height="52" w={"52"} bg="black"></Skeleton>
        <Skeleton height="52" w={"52"} bg="black"></Skeleton>
        <Skeleton height="52" w={"52"} bg="black"></Skeleton>
        <Skeleton height="52" w={"52"} bg="black"></Skeleton>
        <Skeleton height="52" w={"52"} bg="black"></Skeleton>
      </HStack>
    </Box>
  );
};

export default Loader;

export const CoinDetailLoader = () => {
  return (
    <Box minW={"100%"} bgColor={"white"}>
      <Box w={"100%"} mx={"auto"} py={"12"}>
        <Skeleton
          h={["25vh", "32vh", "40", "50vh"]}
          w={"95%"}
          my={"3vh"}
          mx={"auto"}
          bg="black"
        ></Skeleton>
        <VStack
          w={["100%", "80%", "55%"]}
          mx={"auto"}
          shadow={"lg"}
          alignItems={"start"}
          px={"4"}
        >
          <Skeleton rounded={"full"} h={"20"} w={"20"} bg="black"></Skeleton>
          <Skeleton h={"12"} w={"100%"} bg="black"></Skeleton>
          <Skeleton h={"12"} w={"100%"} my={"2vh"} bg="black"></Skeleton>
          <Skeleton
            h={"20vh"}
            w={["100%", "100%", "90%", "75%"]}
            bg="black"
            mx={"auto"}
          ></Skeleton>
        </VStack>
      </Box>
    </Box>
  );
};
