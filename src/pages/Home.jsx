import { Image, Text, Box, Stack, VStack, Heading } from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";
import bit from "../assets/bite.png";

const Home = () => {
  return (
    <Stack gap={0} flexDirection={["column", "column", "row"]}>
      <Box
        bgColor={"black"}
        w={"full"}
        py={["12", "6"]}
        h={["40vh", "55vh", "60vh", "70vh"]}
        flex={"1"}
      >
        <motion.div
          style={{
            height: "85%",
          }}
          animate={{
            translateY: "20px",
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Image
            src={bit}
            h={"100%"}
            filter={"grayscale(1)"}
            w={"full"}
            objectFit={"contain"}
          />
        </motion.div>

        <Text
          color={"white"}
          textAlign={"center"}
          fontSize={["4xl", "6xl"]}
          fontWeight={"thin"}
          mt={["0", "-8 "]}
        >
          X Crypto
        </Text>
      </Box>
      <VStack
        bgColor={"black"}
        justifyContent={"center"}
        color={"white"}
        alignItems={["center", "flex-start"]}
        flex={"1"}
        pl={["0", "0", "12"]}
        px={["4", "5", "10", "14"]}
      >
        <Heading marginBottom={"2"}>About Us</Heading>
        <Text textAlign={["center", "left"]} w={["100%", "100%", "88%", "70%"]}>
          X-crypto was established in 12th oct 2023 by Akash Sir, Many peoples
          struglled with high interest rates, To made goals of these peoples
          true, X-Crypto is here with through guidance, market strategy and much
          more absolutley for free.
        </Text>
        <Text
          color={"#45B8AC"}
          textAlign={"center"}
          fontSize={["xl", "2xl"]}
          mt={"1"}
          fontFamily={"cursive"}
        >
          Your Forex friend.
        </Text>
      </VStack>
    </Stack>
  );
};

export default Home;
