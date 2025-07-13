import React from "react";
import {
  Container,
  HStack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Flex, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon, SunIcon, MoonIcon, useToast } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useDispatch();
  const toast = useToast();
  const { isAuthenticated } = useSelector((state) => state.auth);

  let handleLogout = async () => {
    const result = await dispatch(logout()).unwrap();
    dispatch(logout);
    toast({
      title: "Logout",
      description: result.message,
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };
  return (
    <Container maxW={"1140px"} p={4}>
      <Flex
        height={{ base: "auto", sm: 16 }}
        alignItems={"center"}
        justify={{ base: "space-evenly", sm: "space-between" }}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          bgGradient="linear(to-r,cyan.400,blue.500)"
          bgClip="text"
          fontSize={{ base: "22", sm: "28" }}
          fontWeight="bold"
          textTransform={"uppercase"}
          textAlign={"center"}
        >
          <Link to={"/"}>Product Store</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <PlusSquareIcon fontSize={{ base: 22, sm: 24 }} />
            </Button>
          </Link>
          {isAuthenticated ? (
            <Button onClick={handleLogout} colorScheme="red">
              Logout
            </Button>
          ) : (
            <HStack spacing={2}>
              <Button as={Link} to="/" colorScheme="blue" variant="outline">
                Login
              </Button>
              <Button
                as={Link}
                to="/signup"
                colorScheme="teal"
                variant="outline"
              >
                Sign Up
              </Button>
            </HStack>
          )}

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
