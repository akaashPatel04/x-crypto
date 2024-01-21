import { Heading, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CoinsCard = ({
  name,
  id,
  image,
  symbol,
  price,
  currencySymbol = "₹",
}) => {
  return (
    <Link to={`/Coins/${id}`}>
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
        <Image w={"10"} h={"10"} objectFit={"contain"} src={image} alt="" />
        <Heading size={"md"} textTransform={"uppercase"}>
          {symbol}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
        <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : "NA"}</Text>
      </VStack>
    </Link>
  );
};

export default CoinsCard;
