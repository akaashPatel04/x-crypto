import {
  Container,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ErrorComponent from "../components/ErrorComponent";
import { api } from "..";

const Exchanges = () => {
  const [exchange, setexchange] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, seterror] = useState(false);

  useEffect(() => {
    const fetchExchange = async () => {
      try {
        setLoader(true);
        seterror(false);
        const { data } = await axios.get(`${api}/exchanges`);
        setexchange(data);
        setLoader(false);
      } catch (error) {
        seterror(true);
        setLoader(false);
      }
    };

    fetchExchange();
  }, []);

  if (error)
    return (
      <ErrorComponent message={"Network Error while fetching Exchanges"} />
    );

  return (
    <Container my={"14"} maxW={"5xl"}>
      {loader ? (
        <Loader />
      ) : (
        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
          {exchange.map((item) => {
            return (
              <ExchangeCard
                name={item.name}
                rank={item.trust_score_rank}
                url={item.url}
                img={item.image}
                key={item.id}
              />
            );
          })}
        </HStack>
      )}
    </Container>
  );
};

const ExchangeCard = ({ name, rank, url, img }) => {
  return (
    <a href={url} rel="noreferrer" target="_blank">
      <VStack
        bgColor={"#fff"}
        borderRadius={"10"}
        p={"8"}
        m={"4"}
        w={"52"}
        shadow={"lg"}
        transition={"all 0.25s"}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Image src={img} h={"10"} w={"10"} objectFit={"contain"} />
        <Heading
          w={"95%"}
          textAlign={"center"}
          size={"md"}
          noOfLines={1}
          isTruncated
        >
          {rank}
        </Heading>
        <Text w={"95%"} textAlign={"center"}>
          {name}
        </Text>
      </VStack>
    </a>
  );
};

export default Exchanges;
