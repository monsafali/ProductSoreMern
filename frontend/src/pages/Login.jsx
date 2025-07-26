import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  useColorModeValue,
  VStack,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { login } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginWithGoogle from "../utils/LoginWithGoogle";

const Login = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const toast = useToast();
  const { isLoading, loginError, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

useEffect(() => {
  if (isAuthenticated) {
    toast({
      title: "Login Successful",
      description: "Welcome back!",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });

    const timer = setTimeout(() => {
      navigate("/products");
    }, 1500); // Enough time to show toast

    return () => clearTimeout(timer);
  }
}, [isAuthenticated]);

  const onSubmit = (data) => {
    dispath(login(data));
    reset();
  };
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={useColorModeValue("#E2E8F0", "#171923")}
      px={4}
    >
      <Box
        shadow="lg"
        w={{ base: "90%", sm: "80%", md: "60%" }}
        maxW="500px"
        mx="auto"
        bg={useColorModeValue("white", "gray.800")}
        p={6}
        rounded={"lg"}
      >
        <Heading mb={6} size="lg" textAlign="center">
          Login
        </Heading>
        {/*  Show error message */}
        {loginError && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {loginError}
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl id="email" isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
              />
            </FormControl>

            <FormControl id="password" isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
              />
            </FormControl>

            <Button type="submit" colorScheme="blue" w="full">
              Login
            </Button>
            <Button>
              <LoginWithGoogle />
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
