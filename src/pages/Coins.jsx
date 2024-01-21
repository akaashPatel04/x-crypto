import { Button, Container, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CoinsCard from "../components/CoinsCard";
import Loader from "../components/Loader";
import ErrorComponent from "../components/ErrorComponent";
import { api } from "..";

const Coins = () => {
  const [coins, setcoins] = useState([]);
  const [loader, setloader] = useState(true);
  const [error, seterror] = useState(false);
  const [page, setpage] = useState(1);
  const [currency, setcurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  const changePage = (page) => {
    setpage(page);
    setloader(true);
  };

  const btns = new Array(74).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${api}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setcoins(data);
        setloader(false);
      } catch (error) {
        seterror(true);
        setloader(false);
      }
    };

    fetchCoins();
  }, [currency, page]);

  if (error) return <ErrorComponent message={"Error while fetching Coins"} />;

  return (
    <Container maxW={"5xl"} mb={"14"}>
      {loader ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setcurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value="inr">INR</Radio>
              <Radio value="usd">USD</Radio>
              <Radio value="eur">EUR</Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((items, index) => (
              <CoinsCard
                name={items.name}
                id={items.id}
                key={index}
                image={items.image}
                symbol={items.symbol}
                price={items.current_price}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>
          <HStack
            w={["95%", "75%", "45%"]}
            mx={"auto"}
            px={"8"}
            overflowX={"auto"}
            my={"4"}
          >
            {btns.map((item, index) => (
              <Button
                key={index}
                bgColor={"black"}
                color={"white"}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
