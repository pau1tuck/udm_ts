import React from "react";
import { useRouter } from "next/router";
import {
    Box,
    Button,
    Center,
    Container,
    Flex,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    FormControl,
    Heading,
    Input,
    InputGroup,
    Stack,
    Text,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import Layout from "../../components/layout";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkAdmin } from "../../utils/check-permissions";
import { useCreateTrackMutation } from "../../graphql/graphql";
import { withApollo } from "../../utils/with-apollo";

interface ITrack {
    artist: string;
    title: string;
    version: string;
    label: string;
    image: string;
    filename: string;
    buyUrl: string;
}

const validationSchema = yup.object().shape({
    ["artist"]: yup.string().required().label("Artist"),
    ["title"]: yup.string().required().label("Title"),
    ["version"]: yup.string().label("Version"),
    ["label"]: yup.string().label("Label"),
    ["image"]: yup.string().label("Image Location"),
    ["filename"]: yup.string().required().label("Filename"),
    ["buyUrl"]: yup.string().label("Buy Link"),
});

const CreateTrack = () => {
    const router = useRouter();
    checkAdmin();

    const [CreateTrack] = useCreateTrackMutation();
    const { register, errors, handleSubmit, formState } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onBlur",
        reValidateMode: "onSubmit",
    });

    const onFormSubmit = async (values: ITrack) => {
        const { errors } = await CreateTrack({
            variables: { input: values },
            update: (cache) => {
                cache.evict({ fieldName: "tracks:{}" });
            },
        });
        if (!errors) {
            console.log("Success!");
            router.push("/");
        } else {
            console.log(errors);
        }
    };

    return (
        <Layout>
            <Flex justifyContent="center" fontWeight="600">
                <Container maxW="48em" margin="10px 10px" overflow="hidden">
                    <Heading as="h1" size="lg" textAlign="center" mb={6}>
                        Add New Track
                    </Heading>
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <FormControl isInvalid={!!errors.name}>
                            <Stack spacing={4}>
                                <Input
                                    name="artist"
                                    placeholder="Artist"
                                    ref={register}
                                />
                                <FormErrorMessage>
                                    {errors.artist && errors.artist.message}
                                </FormErrorMessage>
                                <Input
                                    name="title"
                                    placeholder="Title"
                                    autoComplete="off"
                                    ref={register}
                                />
                                <FormErrorMessage>
                                    {errors.title && errors.title.message}
                                </FormErrorMessage>
                                <Input
                                    name="version"
                                    placeholder="Version"
                                    autoComplete="off"
                                    ref={register}
                                />
                                <FormErrorMessage>
                                    {errors.version && errors.version.message}
                                </FormErrorMessage>
                                <Input
                                    name="label"
                                    placeholder="Label"
                                    ref={register}
                                />
                                <FormErrorMessage>
                                    {errors.label && errors.label.message}
                                </FormErrorMessage>
                                <Input
                                    name="image"
                                    placeholder="Image location"
                                    ref={register}
                                />
                                <FormErrorMessage>
                                    {errors.label && errors.label.message}
                                </FormErrorMessage>
                                <Input
                                    name="filename"
                                    placeholder="Filename"
                                    autoComplete="off"
                                    ref={register}
                                />
                                <FormErrorMessage>
                                    {errors.trackUrl && errors.trackUrl.message}
                                </FormErrorMessage>
                                <Input
                                    name="buyUrl"
                                    placeholder="Buy URL"
                                    autoComplete="off"
                                    ref={register}
                                />
                                <FormErrorMessage>
                                    {errors.buyUrl && errors.buyUrl.message}
                                </FormErrorMessage>
                            </Stack>
                        </FormControl>
                        <Button
                            width="100%"
                            mt={8}
                            colorScheme="blue"
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

export default withApollo({ ssr: true })(CreateTrack);
