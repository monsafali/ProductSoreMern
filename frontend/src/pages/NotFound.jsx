import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={useColorModeValue("gray.100", "gray.900")}
      px={6}
    >
      <VStack spacing={6} textAlign="center">
        <Heading fontSize="6xl" color="red.400">
          404
        </Heading>
        <Text fontSize="xl" color={useColorModeValue("gray.700", "gray.200")}>
          Oops! The page you’re looking for doesn’t exist.
        </Text>
        <Button
          as={RouterLink}
          to="/"
          colorScheme="blue"
          size="lg"
          rounded="full"
        >
          Go to Home
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFound;
