import {
  Badge,
  Container,
  Image,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import Loader from "../components/Loader";
import ErrorComponent from "../components/ErrorComponent";
import { api } from "..";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import searchImg from "../assets/searchbit.png";

const Search = () => {
  const [coins, setcoins] = useState([]);
  const [exchanges, setExchanges] = useState([]);
  const [Nft, setNft] = useState([]);

  const [coinResult, setCoinResult] = useState(null);
  const [exchangesResult, setExchangesResult] = useState(null);
  const [NftResult, setNftResult] = useState(null);
  const [currentPage, setCurrentPage] = useState("Coins");

  const [loader, setloader] = useState(false);
  const [error, seterror] = useState(false);
  const [query, setQuery] = useState("");

  const fetchCoins = async () => {
    try {
      if (query === "") {
        toast.error("Please type Something to search!");
        return;
      }
      setloader(true);
      const { data } = await axios.get(`${api}/search?query=${query}`);
      console.log(data);

      setcoins(data.coins);
      setCoinResult(data.coins.length);

      setExchanges(data.exchanges);
      setExchangesResult(data.exchanges.length);

      setNft(data.nfts.splice(0, 100));
      setNftResult(data.nfts.length);

      setloader(false);
    } catch (error) {
      seterror(true);
      setloader(false);
    }
  };

  if (error) return <ErrorComponent message={"Error while Searching Data"} />;

  return (
    <Container maxW={"5xl"} mb={"14"} position={"relative"}>
      {loader ? (
        <Loader />
      ) : (
        <>
          <HStack
            w={["95%", "75%", "65%", "45%"]}
            my={"6"}
            px={["0", "4", "12"]}
            mx={"auto"}
            py={"2"}
            justifyContent={"center"}
            position={"relative"}
          >
            <Input
              placeholder="eg.Etherium"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              maxLength={5}
              backgroundColor={"#fff"}
            />
            <FaSearch
              className="searchIcon"
              cursor={"pointer"}
              onClick={fetchCoins}
            />
          </HStack>
          <Stack
            flexDirection={["row", "row", "row", "column"]}
            position={["sticky", "sticky", "row", "fixed"]}
            top={"16vh"}
            right={["0", "0", "0", "2vh"]}
            zIndex={"6"}
            mx={"auto"}
            w={["100%", "80%", "65%", "18%"]}
            justifyContent={"center"}
            gap={["0", "2", "4"]}
          >
            {coinResult > 0 ? (
              <a href="#Coins">
                <Text
                  ml={"6vw"}
                  textAlign={"center"}
                  onClick={() => setCurrentPage("Coins")}
                  className={
                    currentPage === "Coins" ? "activeButton" : "passiveButton"
                  }
                  fontWeight={"bold"}
                >
                  {coinResult} Coins
                </Text>
              </a>
            ) : coinResult === 0 ? (
              <a href="#Coins">
                <Text
                  ml={"6vw"}
                  textAlign={"center"}
                  onClick={() => setCurrentPage("Coins")}
                  className={
                    currentPage === "Coins" ? "activeButton" : "passiveButton"
                  }
                  fontWeight={"bold"}
                >
                  No Coins
                </Text>
              </a>
            ) : (
              ""
            )}
            {exchangesResult > 0 ? (
              <a href="#Exchanges">
                <Text
                  ml={"6vw"}
                  textAlign={"center"}
                  onClick={() => setCurrentPage("Exchanges")}
                  className={
                    currentPage === "Exchanges"
                      ? "activeButton"
                      : "passiveButton"
                  }
                  fontWeight={"bold"}
                >
                  {exchangesResult} Exchanges
                </Text>
              </a>
            ) : exchangesResult === 0 ? (
              <a href="#Exchanges">
                <Text
                  ml={"6vw"}
                  textAlign={"center"}
                  onClick={() => setCurrentPage("Exchanges")}
                  className={
                    currentPage === "Exchanges"
                      ? "activeButton"
                      : "passiveButton"
                  }
                  fontWeight={"bold"}
                >
                  No Exchanges
                </Text>
              </a>
            ) : (
              ""
            )}

            {NftResult > 0 ? (
              <a href="#Category">
                <Text
                  ml={"6vw"}
                  textAlign={"center"}
                  onClick={() => setCurrentPage("Category")}
                  className={
                    currentPage === "Category"
                      ? "activeButton"
                      : "passiveButton"
                  }
                  fontWeight={"bold"}
                >
                  {NftResult} NFTS
                </Text>
              </a>
            ) : NftResult === 0 ? (
              <a href="#Category">
                <Text
                  ml={"6vw"}
                  textAlign={"center"}
                  className={
                    currentPage === "Category"
                      ? "activeButton"
                      : "passiveButton"
                  }
                  onClick={() => setCurrentPage("Category")}
                  fontWeight={"bold"}
                >
                  No NFTS
                </Text>
              </a>
            ) : (
              ""
            )}
          </Stack>

          {/* ------------------------------ */}
          <Text
            mb={"2"}
            mt={"6"}
            mx={"auto"}
            w={"100%"}
            fontWeight={"bold"}
            textAlign={"center"}
            fontSize={"xl"}
            id="Coins"
          >
            Coins
          </Text>

          <HStack
            wrap={"wrap"}
            justifyContent={"space-evenly"}
            borderBottom={"2px solid #aaa"}
            my={"4"}
            py={"4"}
          >
            {coins.length > 0 ? (
              coins.map((items, index) => (
                <SearchedCoinCard
                  name={items.name}
                  id={items.id}
                  key={index}
                  image={items.large}
                  rank={items.market_cap_rank}
                  symbol={items.symbol}
                />
              ))
            ) : coinResult === 0 ? (
              <HStack h={"15vh"} alignItems={"center"}>
                <Heading>No Coins Found 🔍</Heading>
              </HStack>
            ) : (
              <VStack>
                <Text
                  fontWeight={"bold"}
                  fontFamily={"cursive"}
                  fontSize={"2xl"}
                  color={"#45B8AC"}
                >
                  Search for Coins, Exchanges and NFTS
                </Text>
                <Image src={searchImg} alt="Search" h={"45vh"} />
              </VStack>
            )}
          </HStack>

          {/* ------------------------------- */}
          <Text
            my={"2"}
            fontWeight={"bold"}
            mx={"auto"}
            w={"100%"}
            textAlign={"center"}
            id="Exchanges"
            fontSize={"xl"}
          >
            Exchanges
          </Text>

          <HStack
            wrap={"wrap"}
            justifyContent={"space-evenly"}
            borderBottom={"2px solid #aaa"}
            my={"4"}
            py={"4"}
          >
            {exchanges.length > 0 ? (
              exchanges.map((items, index) => (
                <SearchedExchangeCard
                  name={items.name}
                  key={index}
                  id={items.id}
                  image={items.large}
                  market={items.market_type}
                />
              ))
            ) : exchangesResult === 0 ? (
              <HStack h={"15vh"} alignItems={"center"}>
                <Heading>No Exchanges Found 🔍</Heading>
              </HStack>
            ) : (
              ""
            )}
          </HStack>

          {/* ------------------------------- */}
          <Text
            my={"2"}
            fontWeight={"bold"}
            mx={"auto"}
            w={"100%"}
            textAlign={"center"}
            fontSize={"xl"}
            id="Category"
          >
            NFTS
          </Text>

          <HStack
            wrap={"wrap"}
            justifyContent={"space-evenly"}
            my={"4"}
            py={"4"}
          >
            {Nft.length > 0 ? (
              Nft.map((items, index) => (
                <SearchedNftCard
                  name={items.name}
                  symbol={items.symbol}
                  image={items.thumb}
                  key={index}
                />
              ))
            ) : Nft === 0 ? (
              <HStack h={"15vh"} alignItems={"center"}>
                <Heading>No NFTS</Heading>
              </HStack>
            ) : (
              ""
            )}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Search;

const SearchedCoinCard = ({ name, id, image, rank, symbol }) => {
  return (
    <Link to={`/coins/${id}`}>
      <VStack
        bgColor={"#fff"}
        borderRadius={"10"}
        w={"52"}
        p={"8"}
        m={"4"}
        shadow={"lg"}
        transition={"all 0.25s"}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Image w={"10"} h={"10"} objectFit={"contain"} src={image} alt="Coin" />
        <Heading size={"md"} textTransform={"uppercase"}>
          {symbol}
        </Heading>
        <Badge bgColor={"#45B8AC"} color={"#fff"}>
          {rank ? `#${rank}` : "NA"}
        </Badge>
        <Text noOfLines={1}>{name}</Text>
      </VStack>
    </Link>
  );
};

const SearchedExchangeCard = ({ name, id, image, market, key }) => {
  return (
    <>
      <VStack
        key={key}
        bgColor={"#fff"}
        borderRadius={"10"}
        w={"52"}
        p={"8"}
        m={"4"}
        shadow={"lg"}
        transition={"all 0.25s"}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Image w={"10"} h={"10"} objectFit={"contain"} src={image} alt="Coin" />
        <Heading
          noOfLines={1}
          isTruncated
          size={"md"}
          textTransform={"uppercase"}
        >
          {id && id}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
      </VStack>
    </>
  );
};

const SearchedNftCard = ({ name, image, symbol, key }) => {
  return (
    <>
      <VStack
        key={key}
        bgColor={"#fff"}
        borderRadius={"10"}
        w={"52"}
        p={"8"}
        m={"4"}
        shadow={"lg"}
        transition={"all 0.25s"}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Image w={"10"} h={"10"} objectFit={"contain"} src={image} alt="Coin" />
        <Heading
          w={"95%"}
          isTruncated
          textAlign={"center"}
          size={"md"}
          textTransform={"uppercase"}
        >
          {symbol && symbol}
        </Heading>
        <Text w={"95%"} textAlign={"center"} isTruncated>
          {name}
        </Text>
      </VStack>
    </>
  );
};
