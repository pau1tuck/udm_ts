import React from "react";
import { useRouter } from "next/router";
import {
    Button,
    Container,
    Flex,
    FormErrorMessage,
    FormControl,
    Heading,
    Input,
    Stack,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    useLoginMutation,
    CurrentUserQuery,
    CurrentUserDocument,
} from "../../graphql/graphql";
import Layout from "../../components/layout";
import { withApollo } from "../../utils/with-apollo";

interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    country: string;
    email: string;
    roles?: string[];
}

const validationSchema = yup.object().shape({
    ["email"]: yup
        .string()
        .email()
        .min(6)
        .max(30)
        .required()
        .label("Email address"),
    ["password"]: yup.string().min(8).max(30).required().label("Password"),
});

const Login = () => {
    const router = useRouter();
    const [Login] = useLoginMutation();
    let user: IUser;

    const { register, handleSubmit, errors, formState } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onSubmit",
    });

    const onFormSubmit = async (values: any) => {
        const response: any = await Login({
            variables: values,
            update: (cache, { data }) => {
                cache.writeQuery<CurrentUserQuery>({
                    query: CurrentUserDocument,
                    data: {
                        __typename: "Query",
                        currentUser: data?.login,
                    },
                });
                user = data?.login;
            },
        });
        if (response.data?.login) {
            Cookies.set("user", JSON.stringify(user), {
                expires: 1000 * 60 * 60 * 24 * 365,
            });
            console.log(user);
            router.push("/");
        } else console.log(errors);
    };

    return (
        <Layout size="sm">
            <Flex justifyContent="center" fontWeight="600">
                <Container maxW="sm" margin={1} overflow="hidden">
                    <Heading as="h1" size="lg" textAlign="center" mb={6}>
                        Sign In
                    </Heading>
                    <form noValidate onSubmit={handleSubmit(onFormSubmit)}>
                        <Stack spacing={4}>
                            <FormControl isInvalid={!!errors.email}>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    autoComplete="email"
                                    autoFocus
                                    ref={register}
                                    color="white"
                                />
                                <FormErrorMessage>
                                    {errors.email && errors.email.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.password}>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    autoComplete="password"
                                    ref={register}
                                    color="white"
                                />
                                <FormErrorMessage>
                                    {errors.password && errors.password.message}
                                </FormErrorMessage>
                            </FormControl>
                        </Stack>
                        <Button
                            width="100%"
                            mt={8}
                            colorScheme="primary"
                            isLoading={formState.isSubmitting}
                            type="submit"
                        >
                            SUBMIT
                        </Button>
                    </form>
                </Container>
            </Flex>
        </Layout>
    );
};

export default withApollo({ ssr: true })(Login);
