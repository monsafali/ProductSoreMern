import React from 'react';
import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading,
    VStack,
    useColorModeValue,
    Alert,
    AlertIcon,
    useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { signup } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from "react-router-dom";

const Signup = () => {
    const dispatch = useDispatch()
      const navigate = useNavigate()
    const toast = useToast();
    const { isLoading, signupError, isAuthenticated } = useSelector(state => state.auth);
    // This tracks whether the user JUST signed up
    const [justSignedUp, setJustSignedUp] = useState(false);
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        // console.log('Signup Data:', data);
        dispatch(signup(data))
        setJustSignedUp(true); // Mark as just signed up
        reset();

    };

    // Show toast and redirect ONLY if the user just signed up
    useEffect(() => {
        if (isAuthenticated && justSignedUp) {
            toast({
                title: "Signup Successful",
                description: "Welcome aboard!",
                status: "success",
                duration: 1500,
                isClosable: true,
                position: "top",
            });

            const timer = setTimeout(() => {
                 setJustSignedUp(false);
                navigate("/products");
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [isAuthenticated, justSignedUp, toast, navigate]);

    //  If already authenticated and user did NOT just signup, redirect immediately (no toast)
    if (isAuthenticated && !justSignedUp) {
        return <Navigate to="/products" replace />;
    }


    return (
        <Box
            minH="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg={useColorModeValue('gray.50', 'gray.900')}
            px={4}
        >
            <Box
                maxW="md"
                w="full"
                bg={useColorModeValue('white', 'gray.800')}
                p={8}
                rounded="lg"
                shadow="lg"
            >
                <Heading mb={6} size="lg" textAlign="center">
                    Signup
                </Heading>
                {/*  Show error message */}
                {signupError && (
                    <Alert status="error" mb={4}>
                        <AlertIcon />
                        {signupError}
                    </Alert>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack spacing={4}>
                        <FormControl id="fullName" isInvalid={errors.fullName}>
                            <FormLabel>Full Name</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter your full name"
                                {...register('fullName', { required: 'Full name is required' })}
                            />
                        </FormControl>

                        <FormControl id="email" isInvalid={errors.email}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                {...register('email', { required: 'Email is required' })}
                            />
                        </FormControl>

                        <FormControl id="password" isInvalid={errors.password}>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters',
                                    },
                                })}
                            />
                        </FormControl>

                        <Button type="submit" colorScheme="blue" w="full">
                            Signup
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Box>
    );
};

export default Signup;
