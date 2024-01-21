import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Image,
  Radio,
  RadioGroup,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { CoinDetailLoader } from "../components/Loader";
import ErrorComponent from "../components/ErrorComponent";
import { api } from "..";
import { useParams } from "react-router-dom";
import CryptoChart from "../components/Chart";
import { FaRegStar, FaStar } from "react-icons/fa";

const CoinDetails = () => {
  const [coin, setCoin] = useState(null);
  const [data, setData] = useState([]);
  const [days, setDays] = useState("24h");
  const [currency, setcurrency] = useState("inr");

  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [saveToggle, setSaveToggle] = useState(false);

  const { id } = useParams();

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        setLoader(true);
        const { data } = await axios.get(`${api}/coins/${id}`);
        setCoin(data);

        const { data: chartData } = await axios.get(
          `${api}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setData(chartData.prices);

        setLoader(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoader(false);
      }
    };

    fetchCoin();
  }, [currency, id, days]);

  const btns = ["24h", "7d", "30d", "90d", "1y", "max"];
  const switchTimePeriod = (i) => {
    switch (i) {
      case "24h":
        setDays("24h");
        setLoader(true);
        break;
      case "7d":
        setDays("7d");
        setLoader(true);
        break;
      case "30d":
        setDays("30d");
        setLoader(true);
        break;
      case "90d":
        setDays("90d");
        setLoader(true);
        break;
      case "1y":
        setDays("1y");
        setLoader(true);
        break;
      case "max":
        setDays("max");
        setLoader(true);
        break;

      default:
        setDays("24h");
        setLoader(true);
        break;
    }
  };

  const saveFunction = () => {
    setSaveToggle(!saveToggle);
  };

  if (error)
    return <ErrorComponent message={"Error while fetching The Coin"} />;

  return (
    <Container minW={"100%"} bgColor={"white"}>
      {loader ? (
        <CoinDetailLoader />
      ) : (
        <>
          <RadioGroup
            value={currency}
            onChange={setcurrency}
            py={"8"}
            px={["5vw", "10vw", "20vw"]}
          >
            <HStack spacing={"4"}>
              <Radio value="inr">INR</Radio>
              <Radio value="usd">USD</Radio>
              <Radio value="eur">EUR</Radio>
            </HStack>
          </RadioGroup>

          <Box w={"100%"} mx={"auto"} pb={"15"} pt={"5"}>
            {coin && data && (
              <>
                <CryptoChart
                  data={data}
                  days={days}
                  currency={currencySymbol}
                />
                <HStack
                  w={"full"}
                  flexWrap={"wrap"}
                  py={"4"}
                  mx={"auto"}
                  justifyContent={"center"}
                  gap={["2", "4", "5"]}
                >
                  {btns.map((i) => (
                    <Button
                      className={days == i ? "activeButton" : "passiveButton"}
                      key={i}
                      onClick={() => switchTimePeriod(i)}
                    >
                      {i}
                    </Button>
                  ))}
                </HStack>
                <VStack
                  w={["100%", "80%", "55%"]}
                  mx={"auto"}
                  shadow={"lg"}
                  alignItems={"start"}
                  px={"4"}
                  pos={"relative"}
                >
                  <Text fontSize={"sm"} opacity={"0.85"} alignSelf={"center"}>
                    Last updated :{" "}
                    {Date(coin.market_data.last_updated).split("G")[0]}
                  </Text>
                  <Image
                    src={coin.image.large}
                    h={"20"}
                    w={"20"}
                    objectFit={"contain"}
                  />
                  <Text
                    cursor={"pointer"}
                    onClick={saveFunction}
                    fontWeight={"bold"}
                    pos={"absolute"}
                    right={"4"}
                    top={"4vh"}
                  >
                    {" "}
                    {saveToggle ? (
                      <HStack>
                        <FaStar fontSize={"32px"} /> <Text>Saved</Text>
                      </HStack>
                    ) : (
                      <HStack>
                        <FaRegStar fontSize={"32px"} /> <Text>Save</Text>
                      </HStack>
                    )}{" "}
                  </Text>

                  <Stat>
                    <StatLabel>{coin.name}</StatLabel>
                    <StatNumber>
                      {currencySymbol}
                      {coin.market_data.current_price[currency]}
                    </StatNumber>
                    <StatHelpText>
                      <StatArrow
                        type={
                          coin.market_data.price_change_24h_in_currency[
                            currency
                          ] > 0
                            ? "increase"
                            : "decrease"
                        }
                      />
                      {coin.market_data.price_change_24h_in_currency[currency]}
                    </StatHelpText>
                  </Stat>
                  <Badge
                    fontSize={"2xl"}
                    color={"white"}
                    backgroundColor={"black"}
                  >
                    {`#${coin.market_cap_rank}`}
                  </Badge>
                  <VStack w={"full"}>
                    <HStack justifyContent={"space-between"} w={"100%"}>
                      <Badge colorScheme={"red"}>
                        {`${currencySymbol}${coin.market_data.low_24h[currency]}`}
                      </Badge>
                      <Text fontWeight={"bold"} opacity={"0.6"}>
                        24 Hrs
                      </Text>
                      <Badge colorScheme={"green"}>
                        {`${currencySymbol}${coin.market_data.high_24h[currency]}`}
                      </Badge>
                    </HStack>
                  </VStack>
                  <Box
                    mx={"auto"}
                    w={["100%", "100%", "90%", "75%"]}
                    borderTop={"1px solid #999"}
                    py={"1"}
                    my={"5"}
                  >
                    <Data
                      title={"Max Supply"}
                      value={coin.market_data.ath[currency]}
                    />
                    <Data
                      title={"All Time Low"}
                      value={`${currencySymbol}${coin.market_data.atl[currency]}`}
                    />
                    <Data
                      title={"All Time High"}
                      value={`${currencySymbol}${coin.market_data.ath[currency]}`}
                    />
                    <Data
                      title={"Market Cap"}
                      value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
                    />
                    <Data
                      title={"Volume"}
                      value={coin.market_data.total_volume[currency]}
                    />
                    <Data
                      title={"Circulating Supply"}
                      value={coin.market_data.circulating_supply}
                    />
                  </Box>
                </VStack>
              </>
            )}
          </Box>
        </>
      )}
    </Container>
  );
};

const Data = ({ title, value }) => {
  return (
    <HStack justifyContent={"space-between"} w={"full"} my={"2"}>
      <Text fontFamily={"fantasy"}>{title}</Text>
      <Text>{value}</Text>
    </HStack>
  );
};

export default CoinDetails;
