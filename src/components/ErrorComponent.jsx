import { Alert, AlertIcon, AlertTitle, Box, Image } from "@chakra-ui/react";
import error from "../assets/error.webp";

const ErrorComponent = ({ message }) => {
  return (
    <Box h={["70vh", "85vh", "100vh"]} bgColor={"#FED7D7"}>
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height={["25vh", "32vh"]}
        py={"0"}
      >
        <AlertIcon boxSize="55px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="xl">
          {message}
        </AlertTitle>
      </Alert>
      <Box w={"95%"} mx={"auto"} height={"50vh"}>
        <Image
          src={error}
          mx={"auto"}
          height={["55%", "75%", "90%", "100%"]}
          w={["100%", "75%", "65%", "45%"]}
          alt="Error"
        />
      </Box>
    </Box>
  );
};

export default ErrorComponent;
