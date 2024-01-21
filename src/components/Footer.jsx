import {
  Box,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import me from "../assets/me.png";
import { GrInstagram } from "react-icons/gr";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <Stack
      minH={"30vh"}
      bgColor={"black"}
      color={"white"}
      py={["16", "8"]}
      px={["4", "4", "8", "16"]}
      flexDirection={["column", "row"]}
      alignItems={["center"]}
      justifyContent={"space-between"}
    >
      <VStack alignItems={["center", "flex-start"]}>
        <Heading fontSize={["2xl", "4xl"]} marginBottom={"2"}>
          Easy to Contact
        </Heading>
        <HStack
          gap={["5", "8"]}
          justifyContent={["center", "left"]}
          w={["full", "75%", "55%"]}
        >
          <a href="https://github.com/akaashPatel04" target="_blank">
            <FaGithub className="aboutPageIconsBottom" />
          </a>
          <a href="https://www.instagram.com/akash_.patel04/" target="_blank">
            <GrInstagram className="aboutPageIconsBottom" />
          </a>
          <a
            href="https://www.linkedin.com/in/akash-kumar-patel"
            target="_blank"
          >
            <FaLinkedin className="aboutPageIconsBottom" />
          </a>
        </HStack>
      </VStack>
      <Box textAlign={"center"} marginTop={["4", "0"]}>
        <Box
          w={["100px", "140px", "185px", "210px"]}
          h={["100px", "140px", "185px", "210px"]}
          marginBottom={"2"}
          rounded={"100%"}
          bgColor={"#EEEEEE"}
          overflow={"hidden"}
        >
          <Image h={"100%"} w={"100%"} objectFit={"contain"} src={me} />
        </Box>
        <Text>Our Founder</Text>
      </Box>
    </Stack>
  );
};

export default Footer;
