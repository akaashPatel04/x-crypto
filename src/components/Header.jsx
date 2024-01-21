import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoSettings } from "react-icons/io5";

const hover = {
  "&:hover": {
    backgroundColor: "#cAcAcA",
  },
};

const Header = () => {
  return (
    <HStack
      bgColor={"black"}
      justifyContent={"space-between"}
      px={["4", "8", "14"]}
      py={6}
      alignItems={"center"}
      position={"sticky"}
      top={0}
      left={0}
      w={"100vw"}
      maxW={"100%"}
      zIndex={"5"}
      boxSizing="border-box"
    >
      <HStack bgColor={"black"} gap={["4", "10", "20"]}>
        <Button variant="link" color="white">
          <Link to="/"> Home </Link>
        </Button>
        <Button display={["none", "inline-block"]} variant="link" color="white">
          <Link to="/Coins">Coins</Link>
        </Button>
        <Button variant="link" color="white">
          <Link to="/Exchanges">Exchanges</Link>
        </Button>
      </HStack>
      <Menu>
        <MenuButton colorScheme="black" as={Button}>
          <IoSettings fontSize={"25px"} />
        </MenuButton>
        <MenuList bgColor={"gray.200"}>
          <Link to="/search">
            <MenuItem css={hover} bgColor={"gray.200"} minH="40px">
              <span>Search</span>
            </MenuItem>
          </Link>
          <Link to="/Coins">
            <MenuItem css={hover} bgColor={"gray.200"} minH="40px">
              <span>Coins</span>
            </MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default Header;
